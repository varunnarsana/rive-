export interface AestheticDetail {
  name: string;
  description: string;
  personality: {
    description: string;
    traits: string[];
  };
  music: {
    songs: Array<{
      title: string;
      artist: string;
      imageUrl: string;
    }>;
    playlists: string[];
    artists: Array<{
      name: string;
      imageUrl: string;
      description: string;
    }>;
  };
  fashion: {
    outfits: Array<{
      imageUrl: string;
      description: string;
    }>;
    styles: string[];
    keyPieces: string[];
  };
  decor: {
    elements: string[];
    inspiration: Array<{
      imageUrl: string;
      description: string;
    }>;
    tips: string[];
  };
  colorPalette: Array<{
    color: string;
    name: string;
    hex: string;
  }>;
  artists: Array<{
    name: string;
    type: string;
    imageUrl: string;
    description: string;
  }>;
}

export const aestheticsDetailData: Record<string, AestheticDetail> = {
  'dark-academia': {
    name: 'Dark Academia',
    description: 'A gothic-inspired aesthetic that romanticizes classical literature, art, and learning, emphasizing the pursuit of knowledge and the beauty in the darker aspects of academic life.',
    personality: {
      description: 'Those drawn to Dark Academia tend to be introspective, passionate about learning, and have a romantic view of intellectual pursuits. They value depth in conversations and experiences, finding beauty in melancholy and the pursuit of knowledge.',
      traits: [
        'Intellectual curiosity',
        'Romantic perspective',
        'Appreciation for classics',
        'Introspective nature',
        'Poetic mindset',
        'Detail-oriented',
        'Deep thinker'
      ]
    },
    music: {
      songs: [
        {
          title: 'Nocturnes, Op. 9: No. 2 in E-Flat Major',
          artist: 'Chopin',
          imageUrl: '/images/dark-academia/music/chopin.jpg'
        },
        {
          title: 'Winter Wind Etude',
          artist: 'Chopin',
          imageUrl: '/images/dark-academia/music/winter-wind.jpg'
        },
        {
          title: 'Symphony No. 5',
          artist: 'Beethoven',
          imageUrl: '/images/dark-academia/music/beethoven.jpg'
        }
      ],
      playlists: [
        'Classical Study Sessions',
        'Dark Academia Ambiance',
        'Romantic Era Classics'
      ],
      artists: [
        {
          name: 'Mozart',
          imageUrl: '/images/dark-academia/artists/mozart.jpg',
          description: 'Classical period composer known for emotional depth'
        }
      ]
    },
    fashion: {
      outfits: [
        {
          imageUrl: '/images/dark-academia/fashion/outfit1.jpg',
          description: 'Tweed blazer with wool trousers and Oxford shoes'
        },
        {
          imageUrl: '/images/dark-academia/fashion/outfit2.jpg',
          description: 'Turtleneck sweater with plaid skirt and leather satchel'
        },
        {
          imageUrl: '/images/dark-academia/fashion/outfit3.jpg',
          description: 'Vintage-inspired dress with cardigan and loafers'
        }
      ],
      styles: ['Vintage academic', 'Gothic inspired', 'Classic tailoring'],
      keyPieces: ['Tweed blazers', 'Oxford shoes', 'Leather satchels']
    },
    decor: {
      elements: [
        'Vintage books',
        'Antique furniture',
        'Dark wood accents',
        'Classic artwork'
      ],
      inspiration: [
        {
          imageUrl: '/images/dark-academia/decor/library.jpg',
          description: 'Personal library with floor-to-ceiling bookshelves'
        },
        {
          imageUrl: '/images/dark-academia/decor/study.jpg',
          description: 'Vintage study desk with brass lamp and leather accessories'
        },
        {
          imageUrl: '/images/dark-academia/decor/room.jpg',
          description: 'Moody bedroom with dark wood furniture and classic art prints'
        }
      ],
      tips: [
        'Focus on vintage furniture pieces',
        'Incorporate dark wood elements',
        'Display classic literature collections'
      ]
    },
    colorPalette: [
      {
        color: 'Dark Brown',
        name: 'Vintage Leather',
        hex: '#483C32'
      },
      {
        color: 'Deep Green',
        name: 'Library',
        hex: '#2F4F4F'
      },
      {
        color: 'Burgundy',
        name: 'Old Book',
        hex: '#800020'
      },
      {
        color: 'Charcoal',
        name: 'Tweed',
        hex: '#36454F'
      }
    ],
    artists: [
      {
        name: 'John William Waterhouse',
        type: 'Painter',
        imageUrl: '/images/dark-academia/artists/waterhouse.jpg',
        description: 'Pre-Raphaelite painter known for romantic and literary themes'
      },
      {
        name: 'Virginia Woolf',
        type: 'Writer',
        imageUrl: '/images/dark-academia/artists/woolf.jpg',
        description: 'Modernist writer exploring complex themes and inner monologue'
      },
      {
        name: 'Lord Byron',
        type: 'Poet',
        imageUrl: '/images/dark-academia/artists/byron.jpg',
        description: 'Romantic poet known for dramatic and melancholic works'
      }
    ]
  },
  'y2k': {
    name: 'Y2K',
    description: 'A nostalgic aesthetic celebrating the optimistic, tech-focused, and colorful pop culture of the late 1990s and early 2000s.',
    personality: {
      description: 'Y2K enthusiasts are typically playful, optimistic, and unafraid to stand out. They embrace bold self-expression and have a nostalgic appreciation for the turn of the millennium\'s mix of futurism and pop culture.',
      traits: [
        'Playful spirit',
        'Bold self-expression',
        'Nostalgic outlook',
        'Tech-savvy',
        'Pop culture enthusiast',
        'Experimental style',
        'Confident attitude'
      ]
    },
    music: {
      songs: [
        {
          title: 'Oops!...I Did It Again',
          artist: 'Britney Spears',
          imageUrl: '/images/y2k/music/britney.jpg'
        },
        {
          title: 'Say My Name',
          artist: "Destiny's Child",
          imageUrl: '/images/y2k/music/destinys-child.jpg'
        },
        {
          title: 'I Want It That Way',
          artist: 'Backstreet Boys',
          imageUrl: '/images/y2k/music/backstreet-boys.jpg'
        }
      ],
      playlists: [
        'Y2K Pop Hits',
        'Millennium Dance Party',
        '2000s R&B Classics'
      ],
      artists: [
        {
          name: 'Christina Aguilera',
          imageUrl: '/images/y2k/artists/christina.jpg',
          description: 'Pop icon known for powerful vocals and bold style'
        }
      ]
    },
    fashion: {
      outfits: [
        {
          imageUrl: '/images/y2k/fashion/outfit1.jpg',
          description: 'Crop top with low-rise jeans and platform sandals'
        },
        {
          imageUrl: '/images/y2k/fashion/outfit2.jpg',
          description: 'Metallic mini dress with chunky sneakers'
        },
        {
          imageUrl: '/images/y2k/fashion/outfit3.jpg',
          description: 'Butterfly top with cargo pants and tinted sunglasses'
        }
      ],
      styles: ['Futuristic pop', 'Cyber-inspired', 'Millennium bug'],
      keyPieces: ['Platform shoes', 'Crop tops', 'Low-rise jeans']
    },
    decor: {
      elements: [
        'Lava lamps',
        'Inflatable furniture',
        'Metallic accents',
        'Tech gadgets'
      ],
      inspiration: [
        {
          imageUrl: '/images/y2k/decor/room1.jpg',
          description: 'Bedroom with holographic walls and neon lighting'
        },
        {
          imageUrl: '/images/y2k/decor/room2.jpg',
          description: 'Gaming setup with retro consoles and LED strips'
        },
        {
          imageUrl: '/images/y2k/decor/room3.jpg',
          description: 'Lounge area with inflatable chairs and beaded curtains'
        }
      ],
      tips: [
        'Mix metallic and transparent materials',
        'Add colorful LED lighting',
        'Display vintage tech as decor'
      ]
    },
    colorPalette: [
      {
        color: 'Metallic Silver',
        name: 'Chrome',
        hex: '#C0C0C0'
      },
      {
        color: 'Hot Pink',
        name: 'Cyber Pink',
        hex: '#FF69B4'
      },
      {
        color: 'Electric Blue',
        name: 'Digital Sky',
        hex: '#0066FF'
      },
      {
        color: 'Holographic',
        name: 'Rainbow Shine',
        hex: '#EE82EE'
      }
    ],
    artists: [
      {
        name: 'Paris Hilton',
        type: 'Style Icon',
        imageUrl: '/images/y2k/artists/paris.jpg',
        description: 'Socialite and trendsetter who defined Y2K fashion'
      },
      {
        name: 'TLC',
        type: 'Music Group',
        imageUrl: '/images/y2k/artists/tlc.jpg',
        description: 'R&B group known for their innovative style and music'
      },
      {
        name: 'Mark Ryden',
        type: 'Artist',
        imageUrl: '/images/y2k/artists/ryden.jpg',
        description: 'Pop surrealist painter who influenced Y2K aesthetic'
      }
    ]
  }
  // Add more aesthetics here...
}; 