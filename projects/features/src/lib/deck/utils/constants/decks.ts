import { CardType, Deck, DefaultGameSettingRequirement, DefaultGameSettingValueSource, FreeTextCard, PlayerVotingCard, PollCard, QuizCard } from "@shared";
import { drinkingGameSettingName, speficiPlayerIdSettingName } from "@shared";

const drinkingGame: string = "shared.components.buttons.it-deck.drinking-game-flag";

// Test Decks
export const developmentDeck: Deck = {
    icon: "💻",
    name: "Development Deck",
    description: "Very funny Party Game for your whole family",
    groundRules: [
        {
            text: "Saufts eich gscheid au",
            drinkingRule: true
        },
        {
            text: "Viel Spaß beim Spielen :*"
        }
    ],
    defaultSipTexts: {
        [CardType.PlayerVoting]: "Most voted player drinks 1 sip 🍺",
        [CardType.Poll]: "Distribute 1 sip if you voted the top subject 🍾",
        [CardType.Quiz]: "Distribute 1 sip if you voted correctly 🍷",
    },
    cards: [
{
            text: "Who of you still pees in the shower? It's okay, i’m doing it too 🛁",
            sipText: "Okay you disgusting pieces of shit. Everyone who voted Yes has to drink 3 sips 🤮",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Yes ✅",
                    isTarget: true
                },
                {
                    title: "No ❎"
                }
            ],
            settings: {
                delaySipText: true
            }
        } as QuizCard,
    ],
    flags: [],
    requiredPlayers: {
        playerCount: 2,
        isExactCount: false
    },
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
};

export const partyDeckWithRules: Deck = {
    icon: "🎉",
    name: "Party Game with Rules",
    description: "Very funny Party Game for your whole family",
    cards: [
        {
            text: "Bitte zeige diese Karte an",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Erster :) - %p0 is a echter Wappla",
            type: CardType.PlayerVoting,
            settings: {
                order: 1
            }
        } as PlayerVotingCard,
        {
            text: "Zweiter :)",
            type: CardType.PlayerVoting,
            settings: {
                order: 2

            }
        } as PlayerVotingCard
    ],
    requiredPlayers: {
        playerCount: 1,
        isExactCount: false
    },
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
};
export const partyDeckWithSpMandatory: Deck = {
    icon: "🎉",
    name: "Party Game with sp mandatory",
    description: "Very funny Party Game for your whole family",
    cards: [
        {
            text: "Bitte zeige diese Karte an",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Erster :) - %sp is a echter Wappla",
            type: CardType.PlayerVoting,
            settings: {
                order: 1
            }
        } as PlayerVotingCard,
        {
            text: "Zweiter :)",
            type: CardType.PlayerVoting,
            settings: {
                order: 2

            }
        } as PlayerVotingCard
    ],
    requiredPlayers: {
        playerCount: 2,
        isExactCount: false
    },
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.user,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
};
export const partyDeckWithRulesAndSp: Deck = {
    icon: "🎉",
    name: "Party Game with Rules and sp",
    description: "Very funny Party Game for your whole family",
    cards: [
        {
            text: "Bitte zeige diese Karte an",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Erster :) - %sp und %p0 san echter Wappla",
            type: CardType.PlayerVoting,
            settings: {
                order: 1
            }
        } as PlayerVotingCard,
        {
            text: "Zweiter :)",
            type: CardType.PlayerVoting,
            settings: {
                order: 2

            }
        } as PlayerVotingCard
    ],
    requiredPlayers: {
        playerCount: 2,
        isExactCount: false
    },
};
export const drinkingDeck: Deck = {
    icon: "🍻",
    name: "Drinking Game",
    description: "Party hard!",
    cards: [
        {
            text: "%p0 trink fünf Schlücke :)",
            title: "Dring a moi heast",
            type: CardType.FreeText,
            color: "blue",
            settings: {
                drinkingCard: true,
            }
        } as FreeTextCard
    ],
    requiredPlayers: {
        playerCount: 1,
        isExactCount: false
    },
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        },
        {
            settingName: drinkingGameSettingName,
            value: "true",
            valueSource: DefaultGameSettingValueSource.value,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
    flags: [drinkingGame]
};
export const aLotOfPlayersDeck: Deck = {
    icon: "👩‍👧‍👦",
    name: "A lot of Players Game",
    description: "Hopefully you have a lot of friends",
    cards: [
        {
            text: "%p0, %p1 und %p2 ihr seit mega cool :)",
            type: CardType.FreeText
        } as FreeTextCard
    ],
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
    requiredPlayers: {
        playerCount: 3,
        isExactCount: false
    }
};

export const demoPartyDecks: Deck[] = [
    developmentDeck, partyDeckWithSpMandatory, partyDeckWithRulesAndSp, drinkingDeck, aLotOfPlayersDeck
]

export const leggitPartyDeck: Deck = {
    icon: "🎊",
    name: "aLaCard",
    description: "Very funny Party Game",
    groundRules: [
        {
            text: "**Player Voting Cards**  \nIf the same player is voted by everyone, the sips are doubled! ✌️",
            drinkingRule: true
        },
        {
            text: "**General**  \nIf everyone skips, everyone has to take one sip 😘",
            drinkingRule: true
        }
    ],
    defaultSipTexts: {
        [CardType.PlayerVoting]: "Most voted player drinks 1 sip 🍺",
        [CardType.Poll]: "Distribute 1 sip if you voted the top subject 🍾",
        [CardType.Quiz]: "Distribute 1 sip if you voted correctly 🍷",
    },
    cards: [
        {
            text: "%p0 give out 3 sips to the player you know best! 👥",
            title: "I know you",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Distribute 2 sips if you are not in a relationship 🪐",
            title: "Single's",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "You guys look too sober. Everybody can give out 2 sips! 🍻",
            title: "Drink up",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 a sorrow shared is a sorrow halved. Choose a player and drink 2 sips each ☯️",
            title: "Sorrow's",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 you have the chance to get really disliked by a player! Choose someone to finish their drink! 💔",
            title: "And it's gone",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, you're so rational! Just take 3 sips, and you'll be all set! 🧠",
            title: "Unrational",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, time to spin the bottle. Play a round of truth or dare! 🔄",
            title: "You spin my head",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, you're in jail with a player? Choose your cellmate! 🔒",
            title: "Prison for me and you",
            sipText: "Both of you drink 2 sips and remember – never drop the soap 🧼",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, you accidentally killed someone at work. Choose your colleague who would most likely never talk about it 😶",
            title: "Work it",
            sipText: "Colleague, drink 2 sips with the killer or else 🔪",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, who of you guys is most likely to do weird things in public? 🪠",
            title: "Weirdo",
            sipText: "Drink 2 sips together! 🍹",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, you're robbing a supermarket. Who is supposed to be in charge of the supermarket security? 👮",
            title: "Illegal",
            sipText: "Share 2 sips with your enemy to decrease eye sight! 👀",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, pick your best man or maid of honor 💒",
            title: "Congrats",
            sipText: "Drink to your wedding! 💍",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, the person to your left looks very thirsty. They have to drink 2 sips 🍾",
            title: "Left left left",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, the desire to marry has taken hold of you. Make a convincing marriage proposal to the person on your left. 💍",
            title: "Awww cute",
            sipText: "If you are refused hand out 2 sips. Otherwise drink 1 with your fiance 💏",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, if you could do one thing without suffering the consequences, what would you do? 🧐",
            title: "Just do it",
            sipText: "Tell or drink 2 sips! 💬",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, if you could punch anyone without consequences, who would be your choice? 👊",
            title: "Falcon Punch",
            sipText: "Tell or drink 2 sips! 😘",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "The smallest player desperately needs 4 sips to grow 🪴",
            title: "Grow",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 swap your shirt or pants with %p1 👖👕",
            title: "Clothing swap party!",
            color: "violet",
            sipText: "For this you may distribute 5 sips each. If someone refuses, they have to drink 3 sips 🥂",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 18,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            followUpCardID: 18,
            text: "Clothing swap party is over! Unless you like your new style better 💋",
            title: "Clothing swap party!",
            color: "violet",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 distribute 2 sips to a player thinner than you. If that is not possible get yourself some food and drink yourself 🥪",
            title: "Slim Shady",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Hush, do a somersault! The first person who manages to complete this very complicated task can distribute 2 sips 🤸",
            title: "Sporty",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Do a bottle flip 🍼",
            title: "So 2016",
            sipText: "The legends nailing it first try can distribute 4 sips 🍬",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 distribute 2 sips to a player smarter than you. If that's not possible, drink them yourself! 🧠",
            title: "Brainiac",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, if you had to leave the planning of your wedding to either %p1 or %p2, who would you choose? 👰",
            title: "Congrats!",
            sipText: "Drink to your wedding with your person of honor 🍾",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, if you had to leave the planning of your next vacation to either %p1 or %p2, who would you choose? 🗺️",
            title: "Trippy",
            sipText: "Toast to your trip 🍻",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, if you had to leave the planning of your next birthday party to either %p1 or %p2, who would you choose? 🎂",
            title: "Happy Birthday!",
            sipText: "Toast to your birthday 🍻",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 imitate another player. The others have to find out who %p0 is imitating 🤡",
            title: "Pantomime",
            sipText: "The first person to guess the player gets to give out 2 sips! 🍾",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 guess the color of %p1's underwear 🎨",
            title: "Green?",
            sipText: "Are you right? Distribute 1 sips, otherwise drink yourself 🩲",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "The last person who was on vacation drinks 2 sips! 🗾",
            title: "Holiday",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Men, raise your glasses! 🕺",
            title: "Raise your glasses",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Women raise your glasses! 💃",
            title: "Raise your glasses",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 do me a favor and start a waterfall 🌩️",
            title: "Waterfall baby",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Make a group selfie 📷",
            title: "Let us take a selfie",
            sipText: "Otherwise, everyone has to take a sip 🍻",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Ahhh poetry",
            text: "%p0, Roses are red, violets are blue ... finish the poem or 4 sips for you 🌹",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Drunkard",
            text: "Who usually drinks the most in your group? 🥂?",
            sipText: "Cheers you alcoholic 🤮",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Bravo 6, Going Dark",
            text: "You are all going out partying. Who is the first to black out? 🪩",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Burn baby burn",
            text: "Who would rather accidentally set their hair on fire? 🧯",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Ouch",
            text: "You are all out partying like crazy. Who of you shows up the next morning with a genital piercing? 🪡",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Another one bites the dust",
            text: "During a storm, you are stranded on a desert island. Who will be the first to bite the dust? 🏝️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Style",
            text: "Who would be most likely to wear a Borat for a swim? 🥽",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Geek",
            text: "Who is the biggest nerd? 🤓",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Cat Sad",
            text: "Who would be the most likely to slip on their own cat? 😿",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Good Morning",
            text: "From now on you all only have 2 minutes to get ready in the morning. Which one of you is fucked the most? 🌄",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Car Lover",
            text: "Who of you is most likely to grow old alone with cats? 🐈",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Snap",
            text: "Someone of you has a new hobby - photographing naked people. Sadly they are too shy to share it with everyone. Who do you think is it? 📷",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Like my Coffee",
            text: "Who has the blackest sense of humor? 🖤",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "That's life",
            text: "Who is the biggest couch potato? 🥔",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Helping Hand",
            text: "You all take a walk together and see a old person crossing the streets. Who is the first to come to help? 🧓",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "That's to fast",
            text: "Who should concentrate more on choosing good music rather than nagging as co-driver? 🚘",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Passenger Princess",
            text: "On your holiday you rent a car together but sadly you can only choose one driver. Who definitely has to sit in the back seat? 🥹",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "That's illegal",
            text: "Who would rather use public transport without a ticket? 🚨",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Really?",
            text: "Who would rather lie about themselves to get someone into bed? 🛏️",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Pinocchio",
            text: "Who is the best liar? 🤥",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "So embarrassing",
            text: "I don't want to be seen in public with? 🕶️",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Haha funny",
            text: "Who is the easiest to entertain? 🤡",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Spicy",
            text: "Who would rather work in the sex industry? 🔥",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "One of you bought followers on social media and is to shy to admit it. Who is it? 📱",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "It's a Match",
            text: "Let's assume everyone of you guys is single. Who would hustle the most in online dating? 💘",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "A New Nose, Please",
            text: "Who would be more likely to undergo cosmetic surgery? 🥤",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "2 + 2 = 5",
            text: "You are all playing a card game together. Who do have to watch closely for cheating? 🃏",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Clowny",
            text: "Who is the biggest \"class clown\"? 🤡",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Sound Of The Police",
            text: "Cops called. One of you guys got arrested last night. Who do you think it is? 🚨",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "And They Are Gone",
            text: "Zombies are taking over the world. Who would die first in the apocalypse? ☣️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "To The Bunker",
            text: "Who is best prepared for an apocalypse? ☢️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Good Luck",
            text: "Who is better of with a wingman when it comes to flirting? 🪽",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Flirt Master",
            text: "Who is the best at flirting? 🫦",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Underwear Break",
            text: "Who would rather leave their house without underwear? 🩲",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Stop",
            text: "After your night out you all have to walk back home. Who couldn't resist taking a traffic sign with them? 🛑",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Get Inked",
            text: "Who would rather get a tattoo while being drunk? ✒️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Vegas Baby",
            text: "You all spend a weekend in Las Vegas. Who comes home married? 💍",
            type: CardType.PlayerVoting
            // Idee => Für zwei Spieler abstimmen 
            // "You all spend a weekend in Las Vegas. Who comes home as married couple? 💍"
        } as PlayerVotingCard,
        {
            title: "Prankster",
            text: "Who would be more likely to go overboard with pranks? 🃏",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true
            }
        } as PlayerVotingCard,
        {
            title: "And It's Gone",
            text: "Your group got lost in the desert. Which clumsy fellow accidentally spills the last sip of water? 💧",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Wild spider appeared!",
            text: "Who freaks out the most when insects get too close to them? 🪲",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Hey, Marry Me",
            text: "Someone in your group once tried to propose on the third date. Who do you think probably got rejected? 💔",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Push It",
            text: "You all are trying to buy a new phone on black friday. Who wouldn't mind pushing a child out of the way on their mission? 🖤",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Binge-Watcher",
            text: "You are stuck on the couch with a tv in front of you for the rest of your life. Who would be the happiest in this situation? 📺",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Stingy",
            text: "Who loves shopping on sales the most? 🏷️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "What's the meaning of life?",
            text: "It's 5 am in the morning, everybody is drunk and tired. Now this one person starts a philosophical conversation. Who do you think of? 💭",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Objection!",
            text: "Which one of you would be the most corrupt judge? ⚖️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "And Action",
            text: "Which one of you would be most qualified to be the lead actor/actress in a porn movie? 🍆",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Cunt",
            text: "Who of you is more likely to be arrested for harassing a police officer? 🚓",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Spill the Tea",
            text: "Who do you think has a funny story about losing their virginity? Please share it with us! 🍑",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Thirstiest Player Award",
            text: "Assuming you are all single, who would want to have a one-night stand the most? 🌚",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            title: "Waste Removal Machine",
            text: "Who makes sure that no leftovers reach the trash bin? 😋",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Takeout 'Til Tombstone",
            text: "Who would rather starve to death than start cooking for themselves? ⚰️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Memory Loss",
            text: "Did you ever forget the name of your date or someone you where interested in? 📛",
            sipText: "If so drink 2 sips for even worse memory loss! 🧠",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Workaholic",
            text: "Did you ever go to work beeing tipsy? 🍸",
            sipText: "Drink 2 sips and tell us about it if you did! 🗣️",
            type: CardType.FreeText
        } as PlayerVotingCard,
        {
            title: "Adventure Time",
            text: "Where would you rather travel? ⌚",
            type: CardType.Poll,
            subjects: [
                {
                    title: "50 years into the future 🔮" 
                },
                {
                    title: "50 years into the past 🚂"
                }
            ]
        } as PollCard,
        {
            title: "Power Up",
            text: "Would you rather be able to fly or teleport? ✨",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Fly 🪁" 
                },
                {
                    title: "Teleport 🌀"
                }
            ]
        } as PollCard,
        {
            title: "That's Bad",
            text: "What would you prefer to experience? 🛏️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Your parents catch you having sex 😱" 
                },
                {
                    title: "You catch your parents having sex 🙈"
                }
            ]
        } as PollCard,
        {
            title: "Sweet Tooth",
            text: "What is your favorite type of M&M's? 🍬",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Blue 🔵" 
                },
                {
                    title: "Yellow 🟡"
                },
                {
                    title: "Brown 🟤"
                }
            ]
        } as PollCard,
        {
            title: "Pick Your Poison",
            text: "Which drink do you prefer? 🥤",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Beer 🍺" 
                },
                {
                    title: "Wine 🍷"
                }
            ]
        } as PollCard,
        {
            title: "Hot Stuff",
            text: "What do you prefer to drink? 🫗",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Kakao 🥛" 
                },
                {
                    title: "Coffee ☕"
                },
                {
                    title: "Tea 🍵"
                }
            ]
        } as PollCard,
        {
            title: "Alone",
            text: "Where would you rather be stranded? 💥",
            type: CardType.Poll,
            subjects: [
                {
                    title: "On a deserted island 🏝️" 
                },
                {
                    title: "On a lonely habitable planet 🌎"
                }
            ]
        } as PollCard,
        {
            title: "Money Matters",
            text: "How do you prefer to pay? 💲",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Cash 💵" 
                },
                {
                    title: "Cashless 💳"
                }
            ]
        } as PollCard,
        {
            title: "Party Time",
            text: "What is your favourite location for partying? 🕺",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Disco 🪩" 
                },
                {
                    title: "Bar 🥂"
                },
                {
                    title: "Home 🏠"
                },
                {
                    title: "Not at all ⛔"
                }
            ]
        } as PollCard,
        {
            title: "Music Matters",
            text: "Would you rather only listen to one song or to no music at all for the rest of your life? 🎼",
            type: CardType.Poll,
            subjects: [
                {
                    title: "No longer listen to music 🔇" 
                },
                {
                    title: "Listen to only one song 💿"
                }
            ]
        } as PollCard,
        {
            title: "Hard Decision",
            text: "What item would you take with you to a desert island 🏝️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Rope 🪢" 
                },
                {
                    title: "Blanket 🛏️"
                },
                {
                    title: "Map 🗺️"
                },
                {
                    title: "Backpack 🎒"
                }
            ]
        } as PollCard,
        {
            title: "Weird Decision",
            text: "What item would you take with you to a desert island? 🏝️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Spoon 🥄" 
                },
                {
                    title: "Soap 🧼"
                },
                {
                    title: "Condom 🍆"
                },
                {
                    title: "Money 💵"
                }
            ]
        } as PollCard,
        {
            title: "Dinner Dilemma",
            text: "What would you rather give up at dinner? 🍝",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Chair 🍒" 
                },
                {
                    title: "Table 🍊"
                }
            ]
        } as PollCard,
        {
            title: "Mythical",
            text: "Which mythical creature would you rather be?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Mermaid 🧜🏻‍♀️" 
                },
                {
                    title: "Vampire 🧛"
                },
                {
                    title: "Werewolf 🐺"
                },
                {
                    title: "Dragon 🐲"
                },
                {
                    title: "Elf 🧝🏻‍♀️"
                },
                {
                    title: "Fairy 🧚🏿‍♂️"
                }
            ]
        } as PollCard,
        {
            title: "No Wrong Answers",
            text: "Which team do you belong to? 🤔",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Ass 🍑" 
                },
                {
                    title: "Boobs 🍒"
                }
            ]
        } as PollCard,
        {
            title: "Digital Dilemma",
            text: "If you had to choose one thing that will no longer exist, which one would it be?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Streaming Platforms 📼"
                },
                {
                    title: "Music Streaming Platforms 🎵"
                },
                {
                    title: "Social Media 📱"
                }
            ]
        } as PollCard,
        {
            title: "The End",
            text: "Which apocalypse would you rather suffer? ⚠️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Zombie 🦠" 
                },
                {
                    title: "Atomic 💥"
                },
                {
                    title: "Artificial intelligence 🤖"
                }
            ]
        } as PollCard,
        {
            title: "Ride the Lightning",
            text: "Where would you rather suffer a strong storm? 🌩️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Airplane ✈️" 
                },
                {
                    title: "Ship 🛳️"
                }
            ]
        } as PollCard,
        {
            title: "Escape?",
            text: "Which team do you belong to?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Vacation ✈️" 
                },
                {
                    title: "Staycation 🏠"
                }
            ]
        } as PollCard,
        {
            title: "Give or Get",
            text: "What do you prefer to do? 🎁",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Receive gifts ⬅️" 
                },
                {
                    title: "Present gifts ➡️"
                }
            ]
        } as PollCard,
        {
            title: "Sensitive Subject",
            text: "Do you normally sleep with or without socks? 💤",
            type: CardType.Poll,
            subjects: [
                {
                    title: "with socks 🧦" 
                },
                {
                    title: "without socks 🦶"
                }
            ]
        } as PollCard,
        {
            title: "All or Nothing",
            text: "What hairstyle would you rather have the rest of your life?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Bald (without wig) 👨🏿‍🦲" 
                },
                {
                    title: "Hair down to the feet 👩‍🦰"
                }
            ]
        } as PollCard,
        {
            title: "Food or Fluids",
            text: "If you didn't have to face the consequences, what would you choose for the rest of your life?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "No food 🍛" 
                },
                {
                    title: "No drinks 🥤"
                }
            ]
        } as PollCard,
        {
            title: "New Home",
            text: "If you had to leave the Earth and live on a new civilized planet, which one would you choose? 🪐",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Jungle Planet 🦜" 
                },
                {
                    title: "Desert Planet 🦂"
                },
                {
                    title: "Sea Planet 🐠"
                }
            ]
        } as PollCard,
        {
            title: "Lifestyle of the Famous",
            text: "What would you rather be a successful actor or musician? ✨",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Successful musician 🎹" 
                },
                {
                    title: "Successful actor 🎭"
                }
            ]
        } as PollCard,
        {
            title: "Lies and Deceit",
            text: "Which power would you prefer? 💫",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Recognizing every lie 🔍" 
                },
                {
                    title: "Getting away with every lie 🤥"
                }
            ]
        } as PollCard,
        {
            title: "Love or Lottery",
            text: "Would you rather find true love or be rich? 💖",
            type: CardType.Poll,
            subjects: [
                {
                    title: "True love ❤️‍🔥" 
                },
                {
                    title: "Be rich 💰"
                }
            ]
        } as PollCard,
        {
            title: "Mind or Millions",
            text: "Would you rather like to be the most intelligent or richest?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "The most intelligent 🧠" 
                },
                {
                    title: "The richest 💵"
                }
            ]
        } as PollCard,
        {
            title: "Highspeed",
            text: "What would you rather suffer the rest of your life? 👎",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Always being stuck in traffic 🚦" 
                },
                {
                    title: "Always having slow internet 🌐"
                }
            ]
        } as PollCard,
        {
            title: "Money money money",
            text: "How would you rather become a millionaire? 💸",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Lottery 🎰" 
                },
                {
                    title: "Your work 🛠️"
                }
            ]
        } as PollCard,
        {
            title: "Get Iced Dummy",
            text: "Which ice tea flavour do you prefer? 🍹",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Peach 🍑" 
                },
                {
                    title: "Lemon 🍋"
                }
            ]
        } as PollCard,
        {
            title: "Drop it",
            text: "%p0, have you ever dropped your phone in the toilet 🚽",
            sipText: "Take two sips if you did 🍾",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Drugs are bad, m'kay?",
            text: "Take two sips if you have never taken hard drugs 💊",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Hey there",
            text: "Hey, remember me 🙉",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 0,
                    roundDelay: 6
                }
            }
        } as FreeTextCard,
        {
            followUpCardID: 0,
            title: "Hey there",
            text: "Hey, do you remember me? 🍌",
            color: "violet",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "🙊",
                    isTarget: false
                },
                {
                    title: "🙉",
                    isTarget: true
                },
                {
                    title: "🙈",
                    isTarget: false
                }
            ]
        } as QuizCard,
        {
            title: "Thumb Master 👍",
            text: "%p0 your are crowned Thumb Master. Use your power to distribute 1 sip to those who don't follow your reign 👑",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 1,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Thumb Master 👍",
            text: "%p0 your reign as Thumb Master is over. Hopefully you used your power well 👌",
            color: "violet",
            followUpCardID: 1,
            type: CardType.FreeText
        } as FreeTextCard, 
        {
            title: "Confusion is fun, right?",
            text: "Everyone now has the name of the person sitting to their left. You have to drink 1 sip for switching up names 🗿",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 2,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Confusion is fun, right?",
            text: "Okay this gets boring. You get your real names back 😘",
            color: "violet",
            followUpCardID: 2,
            type: CardType.FreeText
        } as FreeTextCard, 
        {
            title: "Mix it up 🍸",
            text: "Hey gang, %p0 wants a drink. Mix up something good for them to enjoy 🧉",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 3,
                    roundDelay: 1
                }
            }
        } as FreeTextCard,
        {
            title: "Mix it up 🍸",
            text: "Now it's your turn %p0. Choose someone to share half of the good stuff with 😈",
            color: "violet",
            followUpCardID: 3,
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Question Master",
            text: "%p0 it’s your lucky day! Now you are Question Master and everyone who answers one of your questions has to drink 2 sips ⁉️",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 4,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Question Master",
            text: "%p0 you are no longer Question Master 🗿",
            color: "violet",
            followUpCardID: 4,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Switch Up",
            text: "Let’s make intoxicating yourself a little harder. Everyone is only allowed to drink with their none dominant hand 🫱",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 5,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Switch Up",
            text: "Which hand you drink with is again up to you. Did anyone spill something? 🫗",
            color: "violet",
            followUpCardID: 5,
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Promotions baby!",
            text: "Hey guys good news, everyone got a promotion! Ammm that’s everyone but %p0 you slacker. You now have to address everyone as if they were your boss at work. 😪",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 6,
                    roundDelay: 1
                }
            }
        } as FreeTextCard,
        {
            title: "Promotions baby!",
            text: "Corporate Rules: On violation %p0 has to drink one sip 🍺",
            color: "violet",
            followUpCardID: 6,
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 7,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Promotions baby!",
            text: "Ah better late than never. %p0 you also got a promotion. Good work 😉",
            color: "violet",
            followUpCardID: 7,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Dabbing",
            text: "Guys did you hear dabbing is still cool. Everyone please do a dab before you drink or drink again. So cool 🙃",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 8,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Dabbing",
            text: "Okay i can't take it anymore. Please stop the dabbing. You are making fools of yourselfs 🤡",
            color: "violet",
            followUpCardID: 8,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Avocados",
            text: "Is an avocado a fruit or a vegetable? 🥑",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Fruit 🍓",
                    isTarget: true
                },
                {
                    title: "Vegetable 🥒"
                }
            ]
        } as QuizCard,
        {
            title: "Brainiac",
            text: "How many brains does an octopus have? 🐙",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "1️⃣"
                },
                {
                    title: "2️⃣"
                },
                {
                    title: "5️⃣"
                },
                {
                    title: "8️⃣"
                },
                {
                    title: "9️⃣",
                    isTarget: true
                },
                {
                    title: "🔟"
                }
            ]
        } as QuizCard,
        {
            title: "Anatidaephobia",
            text: "What is Anatidaephobia? 📖",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Fear of ducks watching you 🦆",
                    isTarget: true
                },
                {
                    title: "Fear of long words 🔤"
                },
                {
                    title: "Fear of ballons 🎈"
                },
                {
                    title: "Fear of being afraid 😨"
                },
                {
                    title: "Fear of hair 💈"
                }
            ]
        } as QuizCard,
        {
            title: "Fight Club",
            text: "%p0, if you have ever started a fight, take one sip, Rowdy! ⚔️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Confessions",
            text: "Everyone who has already been to a strip club, drink 2 sips you dirty bastards 🏩",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Psss",
            text: "Play a round of Chinese whispers. %p0 you start 😶",
            sipText: "Everyone who makes a mistake has to drink 2 sips 🍺",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Comedians",
            text: "%p0, suddenly you have an urge for good humor. Everyone has to tell you a joke ✨",
            sipText: "The best comedian gets to distribute 3 sips 🎭",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "It's an art",
            text: "%p0 and %p1, show me your powers of doing absolutely nothing. A starring contest will be perfect for that 👀",
            sipText: "Winner gets to distribute 2 sips and loser has to drink 2 😘",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Hook up",
            text: "Everyone who wouldn't mind to hook up today is allowed ahhh i mean required to drink 2 sips for \"better\" communication skills 🎙️ Good luck, you will need it 😘",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Lucky Throw 🎲",
            text: "Hey %p0, throw a dice please. \n - First throw: Amount of sips 🍺\n - Second throw\n\t- 1: Drink your sips\n\t- 2: Distribute them\n\t- 3 - 6: Do the first throw again and sum up the amount of sips\n\nIf you don't have a dice, please continue 🎲",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 9
                }
            }
        } as FreeTextCard,
        {
            title: "Lucky Throw 🎲",
            text: "What do you mean, you don't have a dice? There are even apps for this. Finish your glas you lazy bastard 🦥<br><br>Just ignore this if you did the thing ☺️",
            followUpCardID: 9,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Adilettes",
            text: "%p0, what's the longest distance you've walked out of your house wearing adidas Slides? 🩴",
            sipText: "The others will judge you by that and decide if you have to drink a sip 🤔",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "FBI Open Up",
            text: "%p0, have you ever dated someone that was to old/young for you in hindsight? 🔞",
            sipText: "If so tell the story and drink to your former acquaintance 🗨️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "That's rough",
            text: "%p0, have you ever broken up with a text message? 📝",
            sipText: "If so drink 2 sips. Otherwise distribute them 💋",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Cheaters",
            text: "Everyone who has cheated on someone in their life has to drink 5 sips, you dirty bastards 😡",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Wait what?",
            text: "%p0 drink 2 sips if you are currently not wearing any underwear 🩲",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Born Free",
            text: "%p0 drink 2 sips if you ever left the house without any underwear 👙",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "The Beauty and the Beast",
            text: "%p0, give 3 sips to the most beautiful and 3 sips to the most ugly player. Who you mean exactly can remain a secret 🦢🦋",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Double or Nothing",
            text: "%p0, find a coin and flip it. If it says heads drink 2 sips. Otherwise give the coin to the player left of you. On every player switch the sips are increased by 2. Good luck 🪙",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Stingy",
            text: "%p0, who do you think is more greedy, %p1 or %p2? 🤑",
            sipText: "They can take 2 sips 😶‍🌫️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Rizz Lord",
            text: "%p0, who do you think has more rizz, %p1 or %p2? 🫦",
            sipText: "They can take 2 sips 🥤",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Trauma Dump",
            text: "Red Flags someone in this group experienced in a relationsship. If you repeat or can’t think of something new you loose. %p0, you begin 🚩",
            sipText: "Ah and looser takes 2 sips 😗",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Money",
            text: "Things %p0 likes in potential partners. If you repeat something, can’t think of something new or %p0 thinks you talk nonsense you loose. %p1, you begin 💄",
            sipText: "Ah and looser takes 2 sips 😗",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Stonks",
            text: "%p0 you are planning on investing in stocks. Would you rather choose %p1 and %p2 as your investment guru? 📈",
            sipText: "Drink to your future profits 🥂",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Awwwww",
            text: "%p0 what was the last romantic gesture you’ve made recently? 🌹",
            sipText: "Tell or take 3 sips! 🗣️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Regret Roulette",
            text: "%p0 what is the last thing that you came to regret? 😞",
            sipText: "Tell or take 3 sips! 🗣️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "IQ Test",
            text: "Do you think you belong to the smarter half of the group? Everybody, count down and on the count of three, raise your hand if you are convinced of your intelligence 🧠",
            sipText: "All the bright sparks will take a sip to even out the IQ gap 🤪",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "The Host",
            text: "%p0, for every player who has spent a night at your place, you can give out a sip. But there’s a catch. If all your guests think you are a bad host, you take them yourself 🛎️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "What's My Age Again?",
            text: "%p0, tell us %p1’s age or drink 2 sips 🔞",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Stopped",
            text: "Everyone who has ever stolen a traffic sign has to take a sip. Cheers to anarchy ⛔",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Ikarus",
            text: "%p0 you are in desperate need of a Wingwoman/Wingman. Would you rather choose %p1 or %p2 as your partner in crime? 🪽",
            sipText: "Drink 2 sips to a successful night out 🌃",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Veteran",
            text: "Who of you was the first to start drinking? The person with the most experience demonstrates their skill and takes two sips 👀",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "A Big Mac, please",
            text: "Everyone that has entered a drive-in with a unsuitable vehicle like bike or scooter takes one sip 🛴",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Mismatched",
            text: "Everyone that currently wears different socks on purpose can distribute two sips 🌈",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Someone's Got Talent",
            text: "Any beatboxers or singers among you? Please demonstrate your skills to us 🎤",
            sipText: "If you do so, you can distribute 2 sips each. Otherwise take them yourselfs 😌",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Magic Attack",
            text: "And as next trick the incredible %p0 will make their drink disappear 🪄",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Roller Coaster of Emotions",
            text: "Hey %p0, compliment the person on your right and insult the person on your left 🧚‍♀️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Oh Sh*t",
            text: "Drink if you ever had a pregnancy scare 🍼",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "The Name Game",
            text: "%p0, spell your full name backwards. Drink a sip for every mistake you make 🅰️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "The Walking Cup",
            text: "%p0, get a new drink and place it in front of you. Every time a yellow card appears the cup moves one player to the right. On every Red Card the person with the cup takes a sip. Continue until cup empty 🥤",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Scream",
            text: "You are teleported in a slasher horror movie. %p0 becomes the cruel monster that will kill everyone of you. Who would be the perfect candidate for your first kill? ☠️",
            sipText: "Drink with your victim 🩸",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Time for identity theft!",
            text: "%p0 and %p1 please switch seating, drinks and ah personality as well. Try to imitate the other person as good as you can 🪪",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 10,
                    roundDelay: 6
                }
            }
        } as FreeTextCard,
        {
            title: "Time for identity theft!",
            text: "Identity theft is bad. %p0 and %p1 you get your own seat, drink and personality back 🔙",
            color: "violet",
            followUpCardID: 10,
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 11,
                    roundDelay: 0
                }
            }
        } as FreeTextCard,
        {
            title: "Time for identity theft!",
            text: "Bad identity theft is worse. Everyone else, who did it better? The looser has to drink 3 sips 😙",
            color: "violet",
            followUpCardID: 11,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "3️⃣rd Person",
            text: "%p0 is only allowed to speak about themselves in the third person 🕒",
            color: "violet",
            sipText: "For every mistake %p0 has to take a sip 🧉",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 12,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "3️⃣rd Person",
            text: "%p0 can start to talk normal again 😗",
            color: "violet",
            followUpCardID: 12,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Eye of the Tiger",
            text: "%p0 you’ve got the eye of the tiger. If someone looks you straight in the eye and you notice it, you can hand out a sip to the person in question 👀",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 13,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Eye of the Tiger",
            text: "%p0 unfortunately you've lost the eye of the tiger and thus your powers 🍝",
            color: "violet",
            followUpCardID: 13,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Ho Ho Ho",
            text: "%p0, suddenly you feel like Santa. Choose a player to sit on your lap 🎅",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 14,
                    roundDelay: 10
                }
            }
        } as FreeTextCard,
        {
            title: "Ho Ho Ho",
            text: "Okay Christmas is over people. Everyone can sit on their own again 🐒",
            color: "violet",
            followUpCardID: 14,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Yuck",
            text: "%p0, did you see the drinks of your friends? Yuck, disgusting. From now on you have to supply everyone with fresh and delicious beverages 😋",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 15,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Yuck",
            text: "Ufff %p0 didn't improve the situation with the drinks. Everyone is responsible for their own drinks again 🍹",
            sipText: "If no one got a drink from %p0 they have to bring a round of shots for everyone 🍶",
            color: "violet",
            followUpCardID: 15,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Drinking Buddies!",
            text: "%p0, i know you feel lonely sometimes but that's okay. Choose a drinking buddy. They will support you by always drinking when you have to drink 🫂",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 16,
                    roundDelay: 20
                }
            }
        } as FreeTextCard,
        {
            title: "Drinking Buddies!",
            text: "All good things must end. %p0 you have to enjoy your drinks alone again 🥺",
            color: "violet",
            followUpCardID: 16,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "New Rule!",
            text: "Time to get creative %p0. You can create a rule for the game. Don't get to crazy though 😘",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 17,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "New Rule!",
            text: "%p0 your rule is ineffective from now on. Hopefully you had some fun 📏",
            color: "violet",
            followUpCardID: 17,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Price of Privacy",
            text: "Would you rather win a $100 million lottery and have it announced on national TV or $10 million and no one else knows about it? 💵💴💷💶",
            type: CardType.Poll,
            subjects: [
                {
                    title: "$100 million 📺" 
                },
                {
                    title: "$10 million 🤫"
                }
            ]
        } as PollCard,
        {
            title: "Why Though?",
            text: "Would you rather have a horizontal butt crack or a vertical mouth? 🤔",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Horizontal butt crack 🍑" 
                },
                {
                    title: "Vertical mouth 👄"
                }
            ]
        } as PollCard,
        {
            title: "Home Sweet Home",
            text: "Would you rather be a door or a Window? 🏠",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Door 🚪" 
                },
                {
                    title: "Window 🪟"
                }
            ]
        } as PollCard,
        {
            title: "No-Win Scenario",
            text: "Would you rather never enjoy music again, or never enjoy food again? 🤔",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Never enjoy music 🎶" 
                },
                {
                    title: "Never enjoy food 🥘"
                }
            ]
        } as PollCard,
        {
            title: "Bed Dilemma",
            text: "Would you rather be able to have sex and never orgasm, or be able to have orgasms but never have sex? 🛏️",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Sex 🏩" 
                },
                {
                    title: "Orgasm 👌"
                }
            ]
        } as PollCard,
        {
            title: "The Lesser Evil",
            text: "Would you rather be constantly sticky or itchy all over your entire body? 😖",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Sticky 🍯" 
                },
                {
                    title: "Itchy 🌿"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather find a person or 1000 cockroaches in your attic? 🏡",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Person 🕴️" 
                },
                {
                    title: "1000 cockroaches 🪳"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather be slightly thirsty no matter how much you drink or slightly tired no matter how much you sleep? 🤔",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Slightly thirsty 🚰" 
                },
                {
                    title: "Slightly tired 😪"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather only need 4 hours of sleep every night or maintain a healthy weight eating 500 to 5000 calories every day? 🤔",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Only 4 hours of sleep 🛏️" 
                },
                {
                    title: "Maintain a healthy weight 🍲"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather poop in the only toilet at a party, knowing that you'll clog it, or poop in the bushes in the backyard? 🚽",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Clog that toilet 🪠" 
                },
                {
                    title: "Take it to the bushes 🌳"
                }
            ]
        } as PollCard,
        {
            title: "Helping Hand",
            text: "Would you rather have Regeneration or Healing ❤️‍🩹",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Regeneration 💓" 
                },
                {
                    title: "Healing 💞"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather go to hell or to heaven? Just be there for 30 minutes and see everything and someone explains everything about hell or heaven. No Torture or anything? 🛄",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Heaven 🌌" 
                },
                {
                    title: "Hell 🔥"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather gain all knowledge from books by merely touching them or gain any physical skills by merely watching a video of them? 🧐",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Knowledge from books 📕" 
                },
                {
                    title: "Physical skills by watching video 📼"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather be able to tell your past self one thing or be able to ask your future self one question? ❓",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Tell past self one thing 🧒" 
                },
                {
                    title: "Future self one question 👵"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather be able to tell your past self one thing or be able to ask your future self one question? ❓",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Tell past self one thing 🧒" 
                },
                {
                    title: "Future self one question 👵"
                }
            ]
        } as PollCard,
        {
            text: "Who of you still pees in the shower? It's okay, i’m doing it too 🛁",
            sipText: "Okay you disgusting pieces of shit. Everyone who voted Yes has to drink 3 sips 🤮",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Yes ✅" 
                },
                {
                    title: "No ❎"
                }
            ],
            settings: {
                delaySipText: true
            }
        } as PollCard,
        {
            title: "Revealing",
            text: "All those who have been skinny dipping take 3 sips 🌊",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Enjoy the moment",
            text: "Everyone who took a video of the artist on their last concert has to drink 3 sips. Enjoy the moment you idiots 🎫",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Aha",
            text: "Everyone who has masturbated today drinks 2 sips 🫦",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "That’s ignorant",
            text: "Everyone who has lied today either comes clean or takes 3 sips 🤥",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Half empty",
            text: "The person with the emptiest drink has to finish it and get a new one 🥴",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Babysitting",
            text: "%p0, congrats on your beautiful new child. I’ve heard you need someone for babysitting. %p1 and %p2 both offered their help so who’s your pick? ⛏️",
            sipText: "Toast to your newborn 🍼",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Aww children",
            text: "Everyone who wants or has kids takes 1 sip 🚸",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Raise your glasses",
            text: "💛🤍💜🖤<br>Non Binary Players, raise your glasses 🍷",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Ahh that’s hot",
            text: "The floor is Lava. The last one to touch the ground looses 🌋",
            sipText: "Someone please help the burn victim drink 3 sips 🫶",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Letters",
            text: "%p0, count the letters of your first and last name. This is the amount of sips you are allowed to distribute 📛",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Blackout",
            text: "The last person to have a blackout from too much alcohol drinks 2 sips. If none of you has ever had a blackout, everyone drinks 🤯",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Toilet break is over",
            text: "%p0, get a new drink and place it in the middle. If someone wants to go to the toilet, they have to finish this drink first. After the person has finished their business, they can refill the drink if they want to. 🚽🧻",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Unicorns",
            text: "The unicorn is the national animal of which country? 🦄",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Ireland 🍀"
                },
                {
                    title: "Sweden 🫎"
                },
                {
                    title: "Scotland 🏰󠁧󠁢󠁳󠁣",
                    isTarget: true
                },
                {
                    title: "Canada 🍁"
                }
            ]
        } as QuizCard,
        {
            title: "Breath",
            text: "Which animal can hold its breath longer than a dolphin? 🐬",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Seal 🦭"
                },
                {
                    title: "Penguin 🐧"
                },
                {
                    title: "Beaver 🦫"
                },
                {
                    title: "Sloth 🦥",
                    isTarget: true
                }
            ]
        } as QuizCard,
        {
            title: "Hello Human",
            text: "What kind of bees recognize human faces? 🐝",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Honey Bee 🍯",
                    isTarget: true
                },
                {
                    title: "Sweat Bee 💦"
                },
                {
                    title: "Mining Bee ⛏️"
                }
            ]
        } as QuizCard,
        {
            title: "Wormy?",
            text: "Where are the majority of a butterfly's taste receptors? 🦋",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "On their feet 🐾",
                    isTarget: true
                },
                {
                    title: "On their antenna's 📡"
                },
                {
                    title: "On their proboscis 🌀"
                }
            ]
        } as QuizCard,
        {
            title: "I′m wakin' up",
            text: "Which fruit is mildly radioactive? ☢️",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Kiwis 🥝"
                },
                {
                    title: "Bananas 🍌",
                    isTarget: true
                },
                {
                    title: "Apples 🍎"
                },
                {
                    title: "Blueberries 🫐"
                }
            ]
        } as QuizCard,
        {
            title: "#",
            text: "What is the real name of the #️⃣ symbol?",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Hashtag 📱"
                },
                {
                    title: "Route 🛣️"
                },
                {
                    title: "Octothorpe 🐙",
                    isTarget: true
                }
            ]
        } as QuizCard,
        {
            title: "Two's better",
            text: "In what European country is it illegal to own just one guinea pig? 🐹",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Sweden 🦞"
                },
                {
                    title: "Switzerland 🧀",
                    isTarget: true
                },
                {
                    title: "Spain 🍲"
                },
                {
                    title: "Ireland 🥔"
                }
            ]
        } as QuizCard,
        {
            title: "Evolution baby",
            text: "How hot are the bubbles that the pistol shrimp shoots from its claws? 🦐<br>Same temperature as:",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "The outer earth core 🌎",
                    isTarget: true
                },
                {
                    title: "Lava 🌋"
                },
                {
                    title: "Boiling water 🌊"
                },
                {
                    title: "Oven on max 🔥"
                }
            ]
        } as QuizCard,
        {
            title: "More than you",
            text: "Which male animals have two penises? 🍆",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Snakes 🐍",
                    isTarget: true
                },
                {
                    title: "Octopus 🦑"
                },
                {
                    title: "Giraffe 🦒"
                },
                {
                    title: "Kangaroos 🦘",
                    isTarget: true
                },
                {
                    title: "Ducks 🦆"
                }
            ]
        } as QuizCard,
        {
            title: "Fuck",
            text: "Which Leonardo DiCaprio movies has the most uses of the F-word? 🎬",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "The Revenant 🐻"
                },
                {
                    title: "Django Unchained ⛓️‍💥"
                },
                {
                    title: "The Beach ⛱️"
                },
                {
                    title: "The Wolf of Wall Street 🐺",
                    isTarget: true
                }
            ]
        } as QuizCard,
        {
            title: "Wait, what?",
            text: "How many vaginas does a female kangaroo have? 🦘",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "1️⃣"
                },
                {
                    title: "2️⃣"
                },
                {
                    title: "3️⃣",
                    isTarget: true
                },
                {
                    title: "4️⃣"
                }
            ]
        } as QuizCard,
        {
            title: "Merry Christmas",
            text: "The first artificial Christmas trees were made of what? 🎄",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Painted horsehair 🐴"
                },
                {
                    title: "Tinfoil 🩶"
                },
                {
                    title: "Spaghetti 🍝"
                },
                {
                    title: "Cardboard cutout’s 📦"
                },
                {
                    title: "Dyed goose feathers 🪿",
                    isTarget: true
                }
            ]
        } as QuizCard,
        {
            title: "Hi Brian",
            text: "Besides humans, what is the only other known species to have names for themselves? 📛",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Dolphins 🐬"
                },
                {
                    title: "Orcas 🐋"
                },
                {
                    title: "Elephants 🐘",
                    isTarget: true
                },
                {
                    title: "Parrots 🦜"
                }
            ]
        } as QuizCard,
        {
            title: "Size matters?",
            text: "What is not proven to at least mildly correlate with penis length? 🍆",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "Nose size 👃"
                },
                {
                    title: "Body Height 📏"
                },
                {
                    title: "Prostata Weight ⚖️"
                },
                {
                    title: "Thumb Length 👍",
                    isTarget: true
                }
            ]
        } as QuizCard,
        {
            title: "Pick your zombie",
            text: "What’s the least terrifying trait for a zombie? ",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Running zombies 👟" 
                },
                {
                    title: "Everyone dead person turns 🪦"
                },
                {
                    title: "Intelligent Zombies 🧠"
                }
            ]
        } as PollCard,
        {
            title: "Addiction transfer",
            text: "No player is allowed to consume nicotine. If you want to do so, you have to take 2 sips beforehand. Pfff addicts 🚬",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 18,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Addiction transfer",
            text: "Okay okay i get it, one drug isn’t enough. You can consume your nicotine again you junkies 🍄",
            color: "violet",
            followUpCardID: 18,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Hee hee",
            text: "%p0, the spirit of Micheal Jackson has posessed you, shamone. End all of your sentences with a fitting exclamation like “Hee hee”, “Shamone”, “Hoooo” … 🎤",
            sipText: "For each violation you have to drink 1 sip, auuuuu 🍺",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 19,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Hee hee",
            text: "%p0 the spirit of the king of pop has left you, auuuuu. You can talk normal again, hee hee 👻",
            color: "violet",
            followUpCardID: 19,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Helping hand",
            text: "%p0, you were involved in a tragic Beyblade accident and lost your arms. Choose a player to help you with drinking from now on. 🆘",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 20,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Helping hand",
            text: "Wow %p0, you grew your arms back. That's incredible! Use them to take 5 sips 🤝",
            color: "violet",
            followUpCardID: 20,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Yes",
            text: "%p0, from now on you are the wording police. Choose a word that will be banned. Everytime you catch someone saying this word they have to drink 1 sip 🚨",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 21,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Yes",
            text: "%p0, you are stripped of your title. All words are allowed again 📖",
            color: "violet",
            followUpCardID: 21,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Rock",
            text: "%p0 and %p1, the game challenges you to a rock paper scissors duel. The winner will be highly rewarded 🥇",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 22
                }
            }
        } as FreeTextCard,
        {
            title: "Rock",
            text: "The winner of this epic battle earns the power to force people to a rock paper scissors duel. If the challenged person loses, they have to drink 3 sips 🪨📃✂️",
            color: "violet",
            followUpCardID: 22,
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 23,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Rock",
            text: "Rock Paper Scissors Season is over. Forcing someone to duel's is not possible anymore 🦅",
            color: "violet",
            followUpCardID: 23,
            type: CardType.FreeText
        } as FreeTextCard,
        
        {
            title: "Rap",
            text: "Welcome to our short Battle Rap Event. The crowd is eager to watch our two contestant’s rip each other apart on stage. Please welcome MC %p0 and MC %p1 🎤",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 24
                }
            }
        } as FreeTextCard,
        {
            title: "Rap",
            text: "Now we need the help of our crowd. Please vote for your favorite MC 🏅",
            sipText: "The looser get’s to finish their drink 😗",
            color: "violet",
            followUpCardID: 24,
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 25
                }
            }
        } as FreeTextCard,
        {
            title: "Rap",
            text: "The new rap god get's the ability to force people to drink 2 sips. To use this power our MC has to diss someone with a line that rhymes on something that person said 🌯",
            color: "violet",
            followUpCardID: 25,
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 26,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            title: "Rap",
            text: "All god things must end. The rap god looses their abilities 🎼",
            color: "violet",
            followUpCardID: 26,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Hummingbird",
            text: "%p0, hum a song and the others have to guess, which song you are thinking of 🐝",
            sipText: "Winner get’s to distribute 2 sips 🌝",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Lies and deceit",
            text: "Tell two lies and one truth. The other players have to guess which statement is true 🤥",
            sipText: "Everyone who chooses a lie has to drink 2 sips 🌴",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Time for war",
            text: "%p0 and %p1, prepare for battle. Play a round of thumb war 👍",
            sipText: "The loser get's to drink 3 sips. Our Thumb Master is given the honor of distributing 3 👑",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Littering",
            text: "Everyone who has littered today has to drink 5 sips. Take care of our environment, you morons 🌍",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Bookworm",
            text: "The last person to finish a book can distribute 3 sips 📖",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "The End",
            text: "The apocalypse is here. Zombies have overrun the world. Please share your survival plan with each other 🧟",
            sipText: "The person who is prepared best gets to distribute 3 sips 🛟",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Upsi",
            text: "%p0, what’s the biggest upsi that happened to you at work, school or collage? 🍀",
            sipText: "Tell or drink 2 sips 🍾",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Breaking",
            text: "%p0, think of a headline for today's get together 📰",
            sipText: "Please share your thoughts with us or drink 2 sips 🌝",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Style",
            text: "%p0, you lost the ability to choose clothes in a car accident. Now you need a friend to help you out with that. Who is your future wardrobe stylist? 👘",
            sipText: "Drink to your future styles 🍶",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Yummy",
            text: "%p0, would you ever taste insects? Please tell us about your decision making process 🦗",
            sipText: "Drink if you wouldn't try them ☺️",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Bye bye",
            text: "%p0, your fellow countrymen have finally come to their senses and banned you from living in your home nation. Which country would you choose as your new home?🗾",
            sipText: "Tell us or drink 2 sips 🍸",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "War face",
            text: "%p0, would you join the army if your country was under attack? 🪖",
            sipText: "If not, drink 2 sips to the people protecting your ass 🍑",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Not not naked",
            text: "%p0, who would be the first to run around naked while drunk, %p1 or %p2? 🍜",
            sipText: "Drink a sip with that person 🍾",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "That's just mean",
            text: "%p0, who has more boring life %p1 or %p2? 🫥",
            sipText: "Sorry for asking questions like this. Everyone but the person with the more boring life drinks 2 sips😘",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Who has the gun",
            text: "The apocalypse is here. Zombies walk the streets. %p0 has a gun but knows their aim sucks. Choose a player to hand the gun to 🔫",
            sipText: "The new gunman drinks 2 sips for better aim 🎯",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Pretty flat",
            text: "%p0, drink 1 sip for every conspiracy theorist you know 🥏",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "So romantic",
            text: "%p0, do you think soul mates exist? ♥️",
            sipText: "If so, drink 2 sips to your special someone out there 🍣",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "What's that?",
            text: "Never have i ever pooped in someone's yard 🎍",
            sipText: "If you have done so, drink 2 sips 💩",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Spooky",
            text: "%p0, do you believe in ghosts? 👻",
            sipText: "Everyone who disagrees with you has to drink 2 sips 👹",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "UFO",
            text: "%p0, do you believe in aliens? 🛸",
            sipText: "Everyone who disagrees with you has to drink 2 sips 👽",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Talk to me",
            text: "Never have I ever taken part in a séance 👻",
            sipText: "If you did, drink 2 sips 💀",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Tell me more",
            text: "Tell the group a secret of yours ㊙️",
            sipText: "Drink 2 sips if you are to shy or anyone already knows the “secret” 🍶",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Date",
            text: "%p0, if you had to go on a Date with someone from the group, who would you pick? If your partner is around, don’t even think about choosing them 💄",
            sipText: "Tell us or drink 3 sips 💐",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Mix it up",
            text: "Mix a few sips from each persons drink and then down it. Enjoy 🎨",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Voyeur",
            text: "Give 2 sips to a person you’ve seen naked. If you can’t, please take off your clothe ahhh i mean, take 3 sips 🚿",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            title: "Mr. and Mrs. Nobody",
            text: "Never have I ever pretended to be someone I'm not 🧢",
            sipText: "If you did, drink 2 sips 🔍",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "That’s not nice",
            text: "Never have I ever dined and dashed 🍛",
            sipText: "Everyone who did has to pay a round of drinks tonight. If you guys are not going out, they can take 3 sips 💸",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Bob approved",
            text: "%p0, get some basic drawing utensils for two people. You will choose something %p1 and %p2 have to draw. After 2 minutes the group will crown the new Michelangelo 🎨",
            sipText: "Looser get’s to finish their drink 💌",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Chain rhyme",
            text: "%p0, start with a sentence. The person to your left has to continue with a sentence that rhymes with the one before it. Continue until someone can't think of something new 🌯",
            sipText: "Looser get's to drink 3 sips 🍸",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Ultimate freedom ",
            text: "%p0, your cruise got shipwrecked and you are stranded on a deserted island. Would you rather want %p1 or %p2 to be at your side? 🏝️",
            sipText: "Drink with your partner to bad chances of survival 🏴‍☠️",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Arrr",
            text: "%p0 decided that they will be the king of the priates someday and is in search of a crew. Please tell us your first 3 picks. One of them has to be from your party. All the others have to be real persons 🏴‍☠️",
            sipText: "Take a sip with all your new crew mates 🥃",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Who are you?",
            text: "If someone is new to the group, please introduce yourself 👋",
            sipText: "Everyone takes a welcome sip 🍻",
            type: CardType.FreeText
        } as FreeTextCard,
    ],
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
    requiredPlayers: {
        playerCount: 2,
        isExactCount: false
    },
};
export const askhole: Deck = {
    icon: "🪷",
    name: "askhole",
    description: "Talk about things you normally wouldn't by answering questions ranging from interesting to very weird",
    groundRules: [
        { 
            text: "Each round a new question is drawn from the deck"
        },
        { 
            text: "Every player can answer the question but it is not mandatory"
        },
        { 
            text: "After that a new card is drawn. There is no winner, it's just about fun :)"
        },
        { 
            text: "Be sure to support the original askhole creators!  \nhttp://web.askhole.io/"
        },
    ],
    cards: [
        {
            text: "In what ways are you inhibited from expressing love?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What difficult or painful experience would you recommend to everyone?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the most intense emotional pain you've ever experienced?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In what ways don't you trust yourself?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How have you disappointed your parents?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What about yourself have you been trying to fix for a long time?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How would you raise a child differently from how your parents raised you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was the last thing you cried about? When was it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was the most difficult thing you've ever had to do?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In what ways do you tend to fail at communication?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is currently your greatest insecurity?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which of your habits conflicts with your values?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What aspect about the person to your left gives you the strongest negative feeling?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What do you still owe someone an apology for?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the most sick (mental or physical) you've ever been?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who do you hate most?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is your biggest obstacle toward peace?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What about your appearance would you like to change?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What have you done that you are most ashamed of?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are you afraid of death? Why or why not?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you heal from painful experiences? How do you know when you're done healing?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was your biggest financial mistake?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the most intense physical pain you've ever experienced?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How often and in what ways does fear show up in you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which have you planned in greater detail: killing yourself, or killing someone else?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who in this room would you most like to have sex with?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If everyone in the room were arranged on a spectrum of attractiveness, which two people would you be between?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What problems do you see in the relationships of those around you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You have to marry someone in this room right now. Who is it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is there anything which arouses you that you've never admitted to anybody?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What unusual trait do you find most attractive in a romantic partner?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Out of all your past sexual experiences, what has made you the most uncomfortable?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you were invited to an all-nude party, where all the participants are required to be naked the whole time, would you go?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "When you introspect, away from society and your physical body, deep inside, do you feel a sense of gender?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What were the conditions of your last break-up?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had to choose one, would you rather double or halve your sex drive?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather fuck your girlfriend who is inhabiting your mother's body, or your mother who is inhabiting your girlfriend's body? (If you date men, switch it to boyfriend and father.)",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In total, have you given or received more oral sex?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's one of the most adventurous things you've ever done in bed?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you date yourself?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What percentage of your preferred age/gender demographic would you be down to have sex with after roughly an hour of flirting?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever been in an open or polyamorous relationship? If not, would you consider it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Could you have a serious relationship with someone who expressed that they thought they were unworthy of the relationship?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever dated someone who you felt was below your standards?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How easy is it for you to orgasm?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you ever feel guilt or shame for romantically rejecting people who are interested in you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could press a button and double the sex drive of all women on earth, would you do it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you tried, could you list the names of everyone you've had sex with?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are yelling fights in relationships more typical and inevitable, or terrible and avoidable?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was your most disappointing sexual experience?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What emotion/feeling are you currently suppressing or ignoring?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who in the room do you admire the most?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Did your parents do a good job?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What are the signs that someone understands you uniquely?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the best advice you've received, and why did you need it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What are you waiting to hear from someone close to you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What do you most admire about the person to your right?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "At the gut level, do you feel that the world is safe or not safe?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather increase the amount that people respect you, or increase the amount they desire you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What relatively common experience have you never had?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you ever enjoy the experience of emotional pain?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you been loved enough?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever had (what you consider to be) a spiritual experience? If so, what was it like and what effects did it have on you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you feel a greater sense of satisfaction when you gain approval from people who are very similar to you, or very different from you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could have one but not the other, would you rather love someone or be loved by someone?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What kind of people do you get along best with?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which of your achievements are you most proud of?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Given the guarantee that nobody will ask you the question: What is a question that you would refuse to answer?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How boring are you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you have more thoughts or more feelings?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What are your coping mechanisms for stress?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather double the amount of emotional pain and pleasure you feel on a daily basis, or cut both in half?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the most interesting fact about you that few people know?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which of your personality traits are you most proud of?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which group is larger: people who trust you, or people you trust?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the most significant thing you've ever changed your mind about?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could ask everybody in the world one question, what would it be? You don't get to hear their answers.",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are some human lives worth more than others?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You must pick a number right now and live that many years total, in good physical health. You can't die before, and you can't extend after. How many years do you choose to live?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you consider the state of \"unconditionally loving everyone\" to be desirable or undesirable for you, given it were possible?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are there any thoughts so offensive that you would advocate shaming those who think them, even if they don't act on those thoughts?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which of your beliefs would be the most difficult to change, even in the face of overwhelming evidence?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are there any cases in which you would support forced, involuntary brain modification to change someone else's mind, urges, or behavior?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You can make a designer baby. Would you rather optimize it primarily for intelligence or happiness/optimism?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What do you think enlightenment is?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you believe the set of concepts like \"duty\", \"should\", \"obligation\", and \"deserving\" are ultimately more valid or meaningless?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could press a button that would make you feel deeply and permanently that everything was ok, would you? Assume that you'd remain functional in the world.",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Can someone both be a kind person and also hold the exact opposite of your political views?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could, would you wirehead (i.e. hook yourself up to a hypothetical machine that makes you totally and eternally happy and satisfied)?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you (and only you) could see one measurement or statistic over everyone's heads, what would you want it to indicate?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you prefer to date someone 20 IQ points higher or 5 points lower than you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could press a button that would instantly erase every single false belief you have, would you do it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could ask the universe one question and get the truth, what would you want to know?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is torture ever permissible?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "On planet A, everyone's 30% dumber, and you're a genius by comparison. On planet B, everyone's 30% smarter, and you're an idiot by comparison. You stay the same. Which planet would you prefer to live on?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which technology should not have been invented?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you could magically cause a neutral nude photo of every human to be published publicly on the internet every year on their birthday, would you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Of all the beliefs you hold, which is most likely to be considered barbaric in 150 years?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You see a friend getting into their third emotionally abusive relationship in a row. Are they a victim?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you feel that you have conscious control over your beliefs? Could you, right now, decide to believe something else if you tried? If so, which beliefs?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the most controversial opinion you hold among your own social group?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What viewpoint is the most difficult for you to empathize with?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Does \"no\" always really mean \"no\"?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had to fuck a cow, would you rather it be dead or alive?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you have any political or social opinions that you're afraid to express to your friends?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In your personal experience, even if the difference is extremely slight, are men or women better at handling suffering?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In a world where different ethnicities had strong genetic differences which caused different moral behavior, would racism be okay or still not okay?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What groups or communities are you most judged for being a member of?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In a world where prostitution becomes totally legal and regulated, should sex workers be allowed to refuse clients on the basis of race?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather have accidentally killed someone, or be a nonoffending pedophile?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you support the use of realistic child sex dolls by pedophiles?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather be raped or falsely (but convincingly) accused of rape?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Does modern western culture encourage women either to overreact or underreact to \"minor\" sexual assaults, such as groping, too-drunk sex, etc.?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do society's morals differ from your own?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Regardless of your conscious beliefs or actions, do you feel in your gut that sex work is degrading?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which stereotype is actually pretty accurate?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had to eliminate one million people from one ethnicity, which would it be?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "A 14-year-old has sex. How large does the age gap have to be between the 14-year-old and their partner before the child can no longer meaningfully consent to sex?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If a sex worker consents to sex with a customer under expectation of payment, but then the customer refuses to pay, is this closer to rape or to theft?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's your opinion of education that teaches men to be more seductive?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do women have any systemic privilege due to their gender?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is incest wrong? Should it be illegal?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are there any viewpoints so offensive that they deserve to be shut down or suppressed? If so, which ones?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Regardless of your support or personal feelings, does your subconscious view trans-identifying people as closer to their birth or current gender?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is bestiality wrong? Are you a vegan?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "To what do you attribute to your success?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you named your genitals?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who is your alter ego?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you predict you will die?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How old do you feel?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's your greatest failure?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the worst thing anyone has ever done to you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What are your most prized possessions?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's your boring superpower?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "A woman rapes a man and becomes pregnant. Would you support a law that gives the man the right to force termination of the pregnancy?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you view 'social justice warriors' and 'the alt-right' as roughly equivalent in extremism, just on opposite sides?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are there any things on a dating profile that you agree with or also like, but find a turnoff that they listed it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you personally know when something is immoral?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever dated someone who you felt was below your standards?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had to name one thing you want that drives all your other wants, what would it be?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's a lie you wish you could stop telling yourself?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which is more accurate for you: I do things so that I can make money; or, I make money so that I can do things?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the best thing someone could know about you that might help them?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather be in the top 1% of wealth bracket in 1530, or the bottom 10% of wealth bracket in a modern-day town or city?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You have a piece of art you really like hanging in your living room. One day you learn the artist has been convicted for rape. What do you do with the art piece?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather lose the ability to sing or to swear?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather drown a puppy or have everyone think you drowned a puppy?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Can rape jokes ever be funny?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you believe plants can feel pain?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How susceptible are you to being brainwashed?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How did your parents discipline you when you were a child?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was your greatest sacrifice?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you press a button that doubled your IQ?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you stomp a puppy to death to save a terminally ill child with < 6 months to live?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you have someone you feel comfortable talking to about everything?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had to name one thing you think others envy about you, what would it be?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is sex really about power?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's your relationship to buttplugs?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you be willing to show your browsing history to everybody present? What if this didn't include porn?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you date a prostitute?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather change genders every time you sneeze, or be unable to tell the difference between babies and muffins?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather lick someone else's butthole or your own butthole?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather live a life where you are convinced you're doing good but really you're hurting the world, or a life where you're helping the world but you're convinced that you're failing to do so and actually hurting it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather your life be ended by yourself or others?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather date a kind person with the exact opposite of your political views, or an unkind person who strongly agrees with your views?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Assuming legality isn't an issue and all parties are informed and consenting, would you rather have sex with a 15 year old or a 50 year old?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you have any enemies? If not, who is the closest to being your enemy?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you know when someone is empathizing with you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you woke up to an incredibly physically attractive stranger of your desired sex performing oral on you (without asking), would you feel positively or negatively?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Should male circumcision be legal?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You have the option of moving to one of two cities. In Omelas, 99% of people have 10/10 life quality, while the remaining 1% have 0/10 life quality. In Bergeron, everyone has 5/10 life quality. Which city do you move to?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You're in a monogamous relationship. Your partner gets back late and says \"Honey, I just had sex with the new lifelike sex robot.\" Is this cheating?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "A woman says she's on birth control, and she has sex with a man without a condom. But she was lying \u2014 she was not on birth control. Is this rape?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Are you more concerned with improving the world or improving yourself?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you consider 'being at peace' to be the same thing as 'being happy'?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you have any political or social opinions that you’re afraid to express out loud to your friends?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Given the chance, would you fuck God given He won't judge you for it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever woke up from a dream, crying? What was the dream?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you had enough sex this year?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "When was the last time you masturbated?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you masturbated within the last week to someone you know personally, and also would feel uncomfortable telling them about it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you feel superior to other people?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How do you treat yourself differently from the way you treat others?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How much control do you feel you have over your own emotions?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How often do you feel fear in your life",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How often do you feel pleased at others' misfortunes?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If all sexism were magically and totally eliminated, would gender ratio of all jobs, ideologies, and communities reach 50/50?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If there were a way to painlessly and permanently alter the thoughts of a person you know, who and what would you change?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you had a little teleportation portal, would you fuck yourself in the ass?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you press the button, America gets to elect the primary rulers for every other nation in the world \u2014 and the rest of the world collectively elects America's next president. Do you press the button?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "If you press the button, you enter a magical, permanent state where everything you want is automatically granted right before the want hits your conscious awareness. Besides \"you can't enter a state of desire\" or \"suicide,\" there are no limits in fulfilling what you want. Do you press the button?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is it easier for you to love or hate?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is there any kind of job or employment position in which it should be legal for an employee to refuse to serve a customer based on gender?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is there anyone whose life you value above your own?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "List the people listening to you answer this question in the order they would die in the apocalypse",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "On an instinctual level, do you think of humans as part of nature or separate from nature?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Regardless of how much you personally approve, would you be comfortable having a serious relationship with an active pornstar?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Should people be allowed to sell themselves into slavery, given they are not coerced into the decision, and given full information about what it entails?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "There is a button before you. If you press it, the entire world loses the enchantment it feels when looking at super beautiful faces. Everyone can still see and recognize faces, but all faces feel equally attractive. Would you press the button?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What grudges do you hold?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What in your experience does language fail to capture?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the most insidious ideology surrounding you in life?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What viscous cycles do you find yourself in?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was your darkest night?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What was your worst habit in your worst relationship?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's died in you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "When was the last time you felt fear?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "When you feel an emotion, how often does it involve a physical bodily sensation in addition to a mental state?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Where do you find fulfillment in your life?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which life lessons that you've learned would be most important for the people in this room to hear?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What is the greatest current existential threat to humanity?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Which race, generally speaking, has experienced greater oppression \u2014 blacks or jews?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You find out your crush messages people more boring/ugly/dumb than you on dating sites. Does this reduce your attraction to them?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "You wake up in a body of the opposite sex. It takes years, but you eventually learn to operate in this body — how to navigate romantic/sexual dynamics and social expectations — about as well as people naturally born into this body. Do you predict you'd feel dysphoria?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "How often do you think about your own death?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Have you ever had a plant that you really cared about?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who thinks you're dumb?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "\"Women are oversexualized in media and this should be stopped.\" Agree or disagree?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "In one room, a child is about to die. In the other room, a demon is about to increase unemployment in your country by 1% for 3 years. You can either save the child or kill the demon, but not both. Which do you choose?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "The button will turn your body to clay for 5 minutes so you can mold yourself. No undos or takebacks. Do you use the button?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you ever enjoy not getting what you want?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "What's the most likely way that you might hurt those around you?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "When did you last do something for the first time? What was it?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Would you rather be twice your size or half your size?",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Is it okay to become aroused by fantasies of actions that would result in serious harm if done in real life?",
            type: CardType.FreeText
        } as FreeTextCard
    ],
    styleSettings: {
        cardOverwriteColor: "pink",
        customCardTitle: "Askhole",
        hideDeckNameOnCard: true
    },
    defaultGameSettings: [
        {
            settingName: drinkingGameSettingName,
            value: "false",
            valueSource: DefaultGameSettingValueSource.value,
            requirement: DefaultGameSettingRequirement.required
        },
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
    requiredPlayers: {
        playerCount: 1,
        isExactCount: false
    }
}
export const musicFestivalDrinkingDeck: Deck = {
    icon: "🎶",
    name: "Music Festival Drinking Game",
    description: "Enjoy the new music festival themed drinking game!",
    groundRules: [],
    cards: [
        {
            title: "Early Bird",
            text: "First person that arrived at the festival takes 3 sips 🐦",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "First things first",
            text: "Person that started drinking first can hand out 3 sips 🍺",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Priorities",
            text: "Everyone that started drinking before setting up their tent drinks 2 sips ⛺",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Chug",
            text: "%p0, what's your favorite way to chug a beer? 🍺",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Story Time",
            text: "%p0 any crazy Festival stories you can share with the group? 📰",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "New Friends",
            text: "%p0, if you met new people at the festival and you are currently playing a drinking game with them take two sips each ♥️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Stylish",
            text: "Take two sips if you never wore a costume at a festival 🎎",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Yummy",
            text: "Never have i ever vomited in a tent 🤮",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Smart",
            text: "%p0, what's your favorite festival hack way more people should now about? 👨🏻‍💻",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Hungry",
            text: "%p0, what was the best food you brought to a festival? 🥩",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "That's illegal",
            text: "%p0, what's the most illegal thing you ever did on a festival? ⚖️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Wow",
            text: "What's the best place for watching your favorite artist? 🎚️",
            subjects: [
                {
                    title: "Right in front of the stage 🔊"
                },
                {
                    title: "In or next to the Pit 💥"
                },
                {
                    title: "Behind the crowd 🔙"
                }
            ],
            type: CardType.Poll
        } as PollCard,
        {
            title: "That's a lot",
            text: "The person who visited the most  festivals drinks 5 sips 🦄",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Party Hard",
            text: "Did you ever go to a festival just for partying? If so, you are allowed to drink 3 sips 🍸",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Love at first sight ",
            text: "Was there ever a Band/Artist you got to hear and see for the first time at a festival which stuck with you ever since? 🌹",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Aha",
            text: "Everyone who didn't sleep in their own tent at a festival drinks 3 sips ⛺ ",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Romance",
            text: "Everyone who has dated someone they met at a festival drinks 3 sips 💒",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Overdose",
            text: "Everyone who had to leave a festival because of a injury, too much drugs or any other reason takes two sips 💊",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Fridge anyone",
            text: "What's the craziest thing you brought to a festival? 🛋️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Solo Trip",
            text: "Everyone who has been to a festival alone - tell us about the experience and drink 3 sips 🏝️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Hard choice",
            text: "%p0, if you had to be either totally drunk or sober at every festival, what would you choose? 🥴",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "First Time?",
            text: "Everyone attending a festival for the first time has to take three sips. Much fun you guys 🤟",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Happens",
            text: "Everyone who vommitted today drinks 2 sips 🤮",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Bierbong",
            text: "Everyone who didn't Bierbong today drinks 2 sips 🚿",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: ":*",
            text: "Everyone who didn't get kissed today drinks 1 sip 💋",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Movie Star",
            text: "Who would rather get in the after movie of festival? 🎥",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Ahhhhhple",
            text: "%p0, go to your tent neighbors and ask them for a fruit. If are not successful or too lazy take 5 sips 🍎",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Adventures",
            text: "Who splits up from the group and does some side quests the most? 🧙‍♂️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            title: "Beer with me",
            text: "%p0, you have to get a beer from a random person in the next 3 minutes. If you can’t do that, finish your drink 🫗",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Shots",
            text: "Everyone take a Shot 🔫",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "New Hair Style",
            text: "%p0, let person on your left cut a part of your hair or drink 6 sips 🍻",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Fight",
            text: "Go to one of your neighbors and challenge them to a round of thumb war. If you loose, take 3 sips 👍",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Eminem",
            text: "Name bands that are on the festival. If you can't think of something new or repeat an artist the game ends and the looser has to take 3 sips. %p0 starts! 🎶",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Drugs",
            text: "The person or group that brought the most kinds of drugs drinks 4 sips 💊",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Smells good",
            text: "The person who took the last shower drinks 3 sips 🚿",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Music Jockey",
            text: "If you guys listen to music. On each song change, the person who either guesses the artist or the song name can give out 3 sips 💿",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 0,
                    roundDelay: 10
                }
            }
        } as FreeTextCard,
        {
            title: "Music Jockey",
            followUpCardID: 0,
            text: "Artist and song title guessing is over 😘",
            color: "violet",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            title: "Festival Chef",
            text: "%p0, what’s the best food to bring to a festival? If the others disagree you have to drink 3 sips 🥞",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Festival Drink",
            text: "%p0, what’s the best drink to bring to a festival? If the others disagree you have to drink 3 sips 🫖",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "The Best",
            text: "%p0, what was the best festival you have been to? Tell or drink 2 sips  🎸",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Sounds good",
            text: "%p0, recommend an Artist that everyone should see 🎨 ",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "I want more",
            text: "%p0, if you could add one band to the line up, which one should it be? If the others think, it does not fit the vibe, take 3 sips 🎼",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "This sucks",
            text: "Everyone who thinks today is a weaker day concerning the line up takes 3 sips 👎",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            title: "Clamping",
            text: "Who would rather stay in a Hotel than on the festival camping ground? If you are not camping, everyone takes a sip 🏕️",
            type: CardType.PlayerVoting
        } as PlayerVotingCard
    ],
    defaultGameSettings: [
        {
            settingName: drinkingGameSettingName,
            value: "true",
            valueSource: DefaultGameSettingValueSource.value,
            requirement: DefaultGameSettingRequirement.required
        },
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.default,
            requirement: DefaultGameSettingRequirement.required
        }
    ],
    requiredPlayers: {
        playerCount: 1,
        isExactCount: false
    }

}
export const testingDeck: Deck = {
    icon: "🍰",
    name: "Testing Deck",
    description: "Test the new specific player functionality & follow up card in a birthday themed deck",
    groundRules: [
        {
            text: "**Specific Player**  \nChoose a player of your party to fill a specific spot in the cards",
        },
        {
            text: "**Follow Up Cards**  \nCards that consist of multiple cards which can accour with a delay",
        }
    ],
    cards: [
        {
            text: "First of all, happy birthday to you %sp!",
            type: CardType.FreeText,
            settings: {
                order: 0
            }
        } as FreeTextCard,
        {
            text: "Hey, remember me 🙉",
            color: "violet",
            title: "Follow Up Card",
            type: CardType.FreeText,
            settings: {
                order: 1,
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 0,
                    roundDelay: 4
                }
            }
        } as FreeTextCard,
        {
            followUpCardID: 0,
            text: "Hey, do you remember me? 🍌",
            title: "Follow Up Card",
            color: "violet",
            type: CardType.Quiz,
            subjects: [
                {
                    title: "🙊",
                    isTarget: false
                },
                {
                    title: "🙉",
                    isTarget: true
                },
                {
                    title: "🙈",
                    isTarget: false
                }
            ]
        } as QuizCard,
        {
            text: "%sp won two tickets for a cruise. Who do you think will be able to come along?",
            type: CardType.PlayerVoting,
            settings: {
                order: 2
            }
        } as PlayerVotingCard,
        {
            text: "As a small present to you %sp, you are now crowned Thumb Master of your group!",
            title: "Follow Up Card",
            color: "violet",
            type: CardType.FreeText,
            settings: {
                order: 2,
                followUpCardConfig: {
                    followUpCardID: 1,
                    roundDelay: 4
                }
            }
        } as FreeTextCard,
        {
            followUpCardID: 1,
            text: "%sp sadly your reign as Thumb Master must end now",
            title: "Follow Up Card",
            color: "violet",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you think %sp is happy with his/her presents?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Yes" 
                },
                {
                    title: "No"
                }
            ]
        } as PollCard,
        {
            text: "Raise your glasses to %sp and drink 2 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "If you didn't sing happy birthday for %sp, please continue to do so :)",
            type: CardType.FreeText
        } as FreeTextCard
    ],
    requiredPlayers: {
        playerCount: 1,
        isExactCount: false
    },
    defaultGameSettings: [
        {
            settingName: speficiPlayerIdSettingName,
            valueSource: DefaultGameSettingValueSource.user,
            requirement: DefaultGameSettingRequirement.required
        }
    ]
}

export const leggitPartyDecks: Deck[] = [leggitPartyDeck, askhole, musicFestivalDrinkingDeck, testingDeck];