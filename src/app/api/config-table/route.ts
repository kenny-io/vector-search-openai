import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { supabaseClient } from '../../../../utils/supabaseClient';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { celebrities } = body;

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  // Function to generate OpenAI embeddings for a given text
  async function generateOpenAIEmbeddings(profile) {
    const textToEmbed = Object.values(profile).join(' ');
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: textToEmbed,
    });
    return response.data[0].embedding;
  }
  try {
    // Map over the array and process each item
    const processedDataArray = await Promise.all(
      celebrities.map(async (item) => {
        // Generate OpenAI embeddings for the entire profile object
        const embeddings = await generateOpenAIEmbeddings(item);
        // Modify the item to add an 'embeddings' property
        const modifiedItem = { ...item, embeddings };

        // Post the modified item to the 'profiles' table in Supabase
        const { data, error } = await supabaseClient
          .from('celebrities')
          .upsert([modifiedItem]);

        // Check for errors
        if (error) {
          console.error('Error inserting data into Supabase:', error.message);
          return NextResponse.json({
            success: false,
            status: 500,
            result: error,
          });
        }

        return NextResponse.json({
          success: true,
          status: 200,
          result: data,
        });
      })
    );

    // Check if any insertions failed
    const hasError = processedDataArray.some((result) => !result.success);

    if (hasError) {
      return NextResponse.json({
        error: 'One or more insertions failed',
        status: 500,
      });
    }

    // Data successfully inserted for all items

    return NextResponse.json({
      status: 200,
      success: true,
      results: processedDataArray,
    });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return NextResponse.json({
      status: 500,
      success: false,
      results: error,
      message: 'Internal Server Error',
    });
  }
}
