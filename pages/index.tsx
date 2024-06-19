import type { NextPage } from 'next';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import card1 from '../public/1.jpg';
import card2 from '../public/2.jpeg';
import card3 from '../public/3.jpeg';
import card4 from '../public/4.jpeg';
import card5 from '../public/5.jpg';
import card6 from '../public/6.jpg';
import Carousel from '../components/carousel/Carousel';
import Head from 'next/head';

// This is the main part of our app
const Home: NextPage = () => {

  // state variables
  const [messages, setMessage] = useState<string>("Hey gadhu! 🌟 Missing our crazy times together. 🤪 Can't wait to catch up! 💕");
  const [showVideo, setShowVideo] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('Series_first');

  useEffect(() => {
    const fetchEpisode = async () => {
      const response = await fetch(`/api/episodes?title=${selectedTitle}`);
      const data = await response.json();
      setEpisodes(data);
    };

    fetchEpisode();

    const messages = [
      "Hey Gadhu! 🌟 Missing our crazy times together. 🤪 Can't wait to catch up! 💕",
      "Good morning, Jaan! ☀️ Hope you have a fantastic day ahead. 😊 Stay awesome! 🌸",
      "Gadhu, you're my partner in crime. 💥 Let's plan something fun soon! 🎉 Miss you! 😘",
      "Hey Jaan! 💖 Just wanted to remind you how amazing you are. 😍 Love you loads! 🥰",
      "Thinking of you, Gadhu! 💭 Hope everything is going great. 💕 Let's chat soon! 📞",
      "Hey Jaan! 🌼 You light up my life with your presence. ✨ Stay fabulous! 😘",
      "Gadhu, you always know how to make me smile. 😊 Thanks for being you! 💖 Miss you! 😍",
      "Good night, Jaan! 🌙 Dream sweet dreams and take care. 😘 Can't wait to see you! 🌟",
      "Hey Gadhu! 🎶 Our friendship is like a beautiful song. 🎵 Let's make more memories! 💕",
      "Jaan, you're the best! 🌟 So grateful for your friendship. 😊 Love you tons! 😘",
      "Gadhu, life is more fun with you around. 🤩 Let's plan an adventure soon! 🚀 Miss you! 💖",
      "Hey Jaan! 🌸 Just checking in to see how you're doing. 😊 Sending you good vibes! 🌟",
      "Gadhu, you're a true gem. 💎 Thanks for always being there for me. 💖 Love you! 😘",
      "Hey Jaan! 💕 Remember, I'm always here for you. 😊 Stay strong and keep shining! 🌟",
      "Gadhu, you make every day brighter. ☀️ Can't wait to hang out again! 😍 Miss you! 💖"
    ];
    
    // Random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, [selectedTitle]);


  

  const handleImageClick = (title: string) => {
    setSelectedEpisode(0);
    setSelectedTitle(title);
    setShowVideo(true);
  };

  const handleEpisodeClick = (index : number) => {
    setSelectedEpisode(index)
  }

  // List of images
  const imageItems = [
    <Image key="card1" src={card1} alt='Series First' className='w-full h-full' onClick={() => handleImageClick('Series_first')} />,
    <Image key="card2" src={card2} alt='Series Second' className='w-full h-full' onClick={() => handleImageClick('Series_second')}/>,
    <Image key="card3" src={card3} alt='card3' className='w-full h-full' />,
    <Image key="card4" src={card4} alt='card4' className='w-full h-full' />,
    <Image key="card5" src={card5} alt='card5' className='w-full h-full' />,
    <Image key="card6" src={card6} alt='card6' className='w-full h-full' />
  ];

  return (
    <div className='h-screen w-screen overflow-hidden bg-bg text-white'>
      <Head>
        <title>LakshuFlix</title>
        <link rel='icon' href='favicon.ico' />
      </Head>
      <Header className='fixed top-0 w-full z-20' />

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 pt-20 text-center'>
        {!showVideo && (
          <div className='mb-10 flex flex-col justify-center space-y-6'>
            <h1 className='text-4xl font-bold md:text-5xl'>{messages}</h1>
            <p className='text-center text-xs opacity-75'>Welcome to our Magical World ⭐</p>
          </div>
        )}

        {showVideo && selectedEpisode !== null && episodes.length > 0 ? (
          // video and episode element
          <div className='video-section flex flex-col items-center'>
            <div className='video-container rounded-lg overflow-hidden'>
              <video key={episodes[selectedEpisode].video} controls className='w-full h-auto'>
                <source src={`/${selectedTitle}/${episodes[selectedEpisode].video}`} type='video/mp4' />
                <track src={`/${selectedTitle}/${episodes[selectedEpisode].subtitle}`} kind='subtitles' srcLang='en' label='English' default />
              </video>
            </div>
            <div className='episodes-list-container mt-4 w-full max-w-md overflow-y-auto'>
              <div className="episodes-list">
                {episodes.map((episode, index) => (
                  <div key={index}
                  className='episode-item bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded mb-4 flex items-center justify-between cursor-pointer' 
                  onClick={() => handleEpisodeClick(index)}
                  >
                    <div className="flex items-center">
                      <img src='/play-button.png' alt='play-button' className='w-6 h-6 mr-2' />
                      <span className='text-white font-semibold'>Episode {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Carousel items={imageItems} />
        )}
      </main>
    </div>
  );
};

export default Home;
