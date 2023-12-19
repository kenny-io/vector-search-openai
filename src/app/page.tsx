'use client';
import Image from 'next/image';
import React, { useState } from 'react';
const celebrities = [
  {
    firstName: 'Elon',
    lastName: 'Musk',
    image:
      'https://c4.wallpaperflare.com/wallpaper/1012/124/930/men-elon-musk-wallpaper-preview.jpg',
    age: 50,
    email: 'elon.musk@example.com',
    address: {
      street: 'SpaceX Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '54321',
    },
    hobbies: ['Inventing', 'Space Exploration', 'Twitter'],
    isAdmin: true,
    bio: 'Entrepreneur, inventor, and CEO known for founding SpaceX and Tesla.',
    occupation: 'CEO',
    countryOfOrigin: 'United States',
    relationshipStatus: 'Divorced',
  },
  {
    firstName: 'Oprah',
    lastName: 'Winfrey',
    image:
      'https://c4.wallpaperflare.com/wallpaper/825/71/753/aretha-franklin-haircut-dress-makeup-wallpaper-preview.jpg',
    age: 68,
    email: 'oprah.winfrey@example.com',
    address: {
      street: 'Harpo Studios',
      city: 'Chicago',
      state: 'IL',
      zipCode: '98765',
    },
    hobbies: ['Media Production', 'Philanthropy', 'Book Club'],
    isAdmin: false,
    bio: 'Media mogul, talk show host, and philanthropist with a passion for literature.',
    occupation: 'Media Mogul',
    countryOfOrigin: 'United States',
    relationshipStatus: 'Single',
  },

  {
    firstName: 'Beyoncé',
    lastName: 'Knowles',
    image:
      'https://c4.wallpaperflare.com/wallpaper/624/628/63/beyonce-knowles-8-wallpaper-preview.jpg',
    age: 40,
    email: 'beyonce.knowles@example.com',
    address: {
      street: 'Music Ave',
      city: 'Houston',
      state: 'TX',
      zipCode: '13579',
    },
    hobbies: ['Singing', 'Dancing', 'Acting'],
    isAdmin: false,
    bio: 'International music icon, singer, and actress with a powerful stage presence.',
    occupation: 'Musician',
    countryOfOrigin: 'United States',
    relationshipStatus: 'Married',
  },
  {
    firstName: 'Cristiano',
    lastName: 'Ronaldo',
    image:
      'https://c4.wallpaperflare.com/wallpaper/451/899/608/cristiano-ronaldo-4k-wallpaper-preview.jpg',
    age: 37,
    email: 'cristiano.ronaldo@example.com',
    address: {
      street: 'Soccer Stadium',
      city: 'Turin',
      state: 'Piemonte',
      zipCode: '24680',
    },
    hobbies: ['Football', 'Fitness', 'Fashion'],
    isAdmin: false,
    bio: 'Renowned footballer and fitness enthusiast with a passion for fashion.',
    occupation: 'Footballer',
    countryOfOrigin: 'Portugal',
    relationshipStatus: 'In a Relationship',
  },
  {
    firstName: 'Angela',
    lastName: 'Merkel',
    image:
      'https://c1.wallpaperflare.com/preview/552/379/597/angela-merkel-europe.jpg',
    age: 68,
    email: 'angela.merkel@example.com',
    address: {
      street: "Chancellor's Office",
      city: 'Berlin',
      state: 'Berlin',
      zipCode: '86420',
    },
    hobbies: ['Politics', 'Reading', 'Hiking'],
    isAdmin: true,
    bio: 'Former Chancellor of Germany known for her leadership in European politics.',
    occupation: 'Politician',
    countryOfOrigin: 'Germany',
    relationshipStatus: 'Widowed',
  },
  {
    firstName: 'Malala',
    lastName: 'Yousafzai',
    image:
      'https://c4.wallpaperflare.com/wallpaper/277/205/302/nobel-prize-winner-inspiration-malala-yousafzai-8k-wallpaper-preview.jpg',
    age: 24,
    email: 'malala.yousafzai@example.com',
    address: {
      street: 'Education Street',
      city: 'Birmingham',
      state: 'England',
      zipCode: '97531',
    },
    hobbies: ['Education Advocacy', 'Writing', 'Public Speaking'],
    isAdmin: false,
    bio: "Nobel laureate and advocate for girls' education worldwide.",
    occupation: 'Activist',
    countryOfOrigin: 'Pakistan',
    relationshipStatus: 'Single',
  },
  {
    firstName: 'LeBron',
    lastName: 'James',
    image:
      'https://c4.wallpaperflare.com/wallpaper/624/728/54/basketball-lebron-james-american-nba-wallpaper-preview.jpg',
    age: 37,
    email: 'lebron.james@example.com',
    address: {
      street: 'Basketball Court',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '75321',
    },
    hobbies: ['Basketball', 'Business', 'Philanthropy'],
    isAdmin: false,
    bio: 'NBA superstar, businessman, and philanthropist committed to social causes.',
    occupation: 'Basketball Player',
    countryOfOrigin: 'United States',
    relationshipStatus: 'Married',
  },

  {
    firstName: 'Adele',
    lastName: 'Adkins',
    image:
      'https://c4.wallpaperflare.com/wallpaper/146/297/282/singer-composer-adele-adele-wallpaper-preview.jpg',
    age: 33,
    email: 'adele.adkins@example.com',
    address: {
      street: 'Music Lane',
      city: 'London',
      state: 'England',
      zipCode: '25814',
    },
    hobbies: ['Singing', 'Songwriting', 'Cooking'],
    isAdmin: false,
    bio: 'Grammy-winning singer-songwriter with a soulful voice and a love for cooking.',
    occupation: 'Musician',
    countryOfOrigin: 'United Kingdom',
    relationshipStatus: 'Divorced',
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(celebrities);

  const SearchResultCard = ({ profile }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-md m-4 h-1/2 w-1/2">
      <img
        src={profile.image}
        alt={profile.firstName}
        className="w-full h-64 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${profile.firstName} ${profile.lastName}`}</div>
        <p>{`Age: ${profile.age}`}</p>
      </div>
    </div>
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to perform search based on `searchTerm` here
    const filteredResults = celebrities.filter((profile) =>
      `${profile.firstName} ${profile.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <div className="py-16 w-full flex justify-center items-center bg-gray-100 flex-col overflow-y-scroll">
      <form
        onSubmit={handleSubmit}
        className="m-16 bg-white rounded-lg shadow-md flex w-full md:w-1/2 p-4"
      >
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow text-lg font-light focus:outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-r-lg"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center overflow-y-auto">
        {searchResults.map((profile, index) => (
          <SearchResultCard key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
}
