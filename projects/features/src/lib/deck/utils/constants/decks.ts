import { CardType, Deck, DefaultGameSettingRequirement, DefaultGameSettingValueSource, FreeTextCard, PlayerVotingCard, PollCard, QuizCard, VotingCardGroup } from "@shared";
import { drinkingGameSettingName, speficiPlayerIdSettingName } from "@shared";

const drinkingGame: string = "shared.components.buttons.it-deck.drinking-game-flag";

// Test Decks
export const developmentDeck: Deck = {
    icon: "💻",
    name: "Development Deck",
    description: "Very funny Party Game for your whole family",
    cards: [
        
        {
            text: "💛🤍💜🖤<br>Non Binary Players, raise your glasses 🍷",
            title: "Raise your glasses",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
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
    groundRules: [
        "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
        "The winner is the last one standing :*",
        "Don't drink too much ;)",
        "Don't forget to **have fun** :)"
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
    groundRules: [
        "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
        "The winner is the last one standing :*",
        "Don't drink too much ;)",
        "Don't forget to **have fun** :)"
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
            text: "%p0 and %p1, play three rounds of rock paper scissors 🪨📄✂️",
            title: "Rock, I choose rock!",
            sipText: "The loser suddenly gets the desire to finish their drink and does so 🫗",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "Make a group selfie 📷",
            title: "Let us take a selfie",
            sipText: "Otherwise, everyone has to take a sip 🍻",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, Roses are red, violets are blue ... finish the poem or 4 sips for you 🌹",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Who tolerates the least alcohol?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who throws up the most from too much alcohol?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather accidentally set their hair on fire?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to get a intimate piercing?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be most likely to survive on a deserted island?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be most likely to wear a Borat for a swim?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the biggest nerd?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be the most likely to slip on their own cat?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the most vain?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would rather grow old alone with cats?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to ride a bike to the drive-in?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather photograph naked people as a hobby?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who has the blackest sense of humor?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the biggest couch potato?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to help old people cross the street?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who nags the most as a co-driver?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the worst driver?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to use public transportation without a ticket?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the biggest peeping Tom?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would rather lie about themselves to get someone into bed?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who can lie the most believably?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather destroy a child's sandcastle in front of his eyes?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "With whom you can not be seen in public?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who is the easiest to entertain?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather prostitute themselves?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to buy followers?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who's on the most dating platforms?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to undergo cosmetic surgery?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who cheats the most when playing games?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the biggest \"class clown\"?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who surfs the darknet the most?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to get arrested?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would die first in an apocalypse?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is best prepared for an apocalypse?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the worst at flirting?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the best at flirting?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather go out of the house without underwear?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather steal a traffic sign?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather get a tattoo while drunk?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather get married in Las Vegas?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to go overboard with pranks?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would rather forget their date's name?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would accidentally spill the last sip of water on a desert trip?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is most afraid of insects?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to buy a round of drinks?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to propose on the third date?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who would rather go to work drunk?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to push a child?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is the biggest series junkie?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Which player is the stingiest?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would rather start a philosophical conversation while drunk?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Which one of you would be the most corrupt judge?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Which one of you would be most qualified to be the lead actor/actress in a porn movie?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who of you is more likely to be arrested for harassing a police officer?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who has the funniest story about losing their virginity, do you think?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who is most likely to have a one-night stand?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who wet his/her bed the longest?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Who's the leftover eater among you?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who would be more likely to start a relationship with a friend's parent?",
            type: CardType.PlayerVoting,
            settings: {
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Whose cooking skills are only good enough for finished products?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Who watches the most trash TV?",
            type: CardType.PlayerVoting
        } as PlayerVotingCard,
        {
            text: "Where would you rather travel?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "200 years into the future" 
                },
                {
                    title: "200 years into the past"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather be able to fly or teleport?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Fly" 
                },
                {
                    title: "Teleport"
                }
            ]
        } as PollCard,
        {
            text: "What would you prefer to experience?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Your parents catch you having sex" 
                },
                {
                    title: "You catch your parents having sex"
                }
            ]
        } as PollCard,
        {
            text: "What is your favorite type of M&M's?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "🔵 Blue" 
                },
                {
                    title: "🟡 Yellow"
                },
                {
                    title: "🟤 Brown"
                }
            ]
        } as PollCard,
        {
            text: "Where do you prefer to spend your vacation?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "In the mountains 🏞️" 
                },
                {
                    title: "On the beach 🏖️"
                },
                {
                    title: "In the city 🏙️"
                }
            ]
        } as PollCard,
        {
            text: "What do you prefer to drink?",
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
            text: "What do you prefer to drink?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Kakao 🥛" 
                },
                {
                    title: "Coffee ☕"
                }
            ]
        } as PollCard,
        {
            text: "Where would you rather be stranded?",
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
            text: "What do you prefer to drink",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Cola" 
                },
                {
                    title: "Pepsi"
                }
            ]
        } as PollCard,
        {
            text: "How do you prefer to pay?",
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
            text: "Where do you like to party most?",
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
            text: "What would you rather only listen to one song or to no music at all for the rest of your life?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "No longer listen to music" 
                },
                {
                    title: "Listen to only one song"
                }
            ]
        } as PollCard,
        {
            text: "What item would you take with you to a desert island",
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
            text: "What item would you take with you to a desert island?",
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
            text: "What would you rather give up at dinner?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Chair" 
                },
                {
                    title: "Table"
                }
            ]
        } as PollCard,
        {
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
            text: "What is the best movie universe?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Lord of the Rings 💍" 
                },
                {
                    title: "Harry Potter 🪄"
                },
                {
                    title: "Star Wars 🪐"
                },
                {
                    title: "None of the above ⛔"
                }
            ]
        } as PollCard,
        {
            text: "Which team do you belong to?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Ass" 
                },
                {
                    title: "Boobs"
                }
            ]
        } as PollCard,
        {
            text: "Which fast food chain is the best?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Burger King" 
                },
                {
                    title: "MC Donalds"
                },
                {
                    title: "Subway"
                }
            ]
        } as PollCard,
        {
            text: "Which tattoo would you rather get?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "An ugly one that you choose yourself" 
                },
                {
                    title: "A tattoo that your parents choose"
                }
            ]
        } as PollCard,
        {
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
                    title: "YouTube and clones 💻"
                }
            ]
        } as PollCard,
        {
            text: "Which apocalypse would you rather suffer?",
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
            text: "Where would you rather suffer a strong storm?",
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
            text: "In which desert would you rather be stranded?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Ice desert ❄️" 
                },
                {
                    title: "Sand desert ☀️"
                }
            ]
        } as PollCard,
        {
            text: "Which team do you belong to?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "School/University 📚" 
                },
                {
                    title: "Work 🔨"
                }
            ]
        } as PollCard,
        {
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
            text: "What do you prefer to do?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Receive gifts" 
                },
                {
                    title: "Present gifts"
                }
            ]
        } as PollCard,
        {
            text: "Do you normally sleep with or without socks?",
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
            text: "If you had to leave the Earth and live on a new civilized planet, which one would you choose?",
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
            text: "What would you rather be a successful actor or musician?",
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
            text: "Would you rather never be sedentary or always be sedentary",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Never be sedentary" 
                },
                {
                    title: "Always be sedentary"
                }
            ]
        } as PollCard,
        {
            text: "Which power would you prefer?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Recognizing every lie" 
                },
                {
                    title: "Getting away with every lie"
                }
            ]
        } as PollCard,
        {
            text: "Would you rather find true love or be rich?",
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
            text: "What would you rather suffer the rest of your life?",
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
            text: "How would you rather become a millionaire?",
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
            text: "Which ice tea flavour do you prefer?",
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
            text: "Which side of the Twinni is better?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Green 🟢" 
                },
                {
                    title: "Orange 🟠"
                }
            ]
        } as PollCard,
        {
            text: "Who of you guys was stupid enough to drop their phone in the toilet? 🚽",
            sipText: "Yes? You definitely earned 2 sips with that 🍻",
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
                sipConfig: {
                    group: VotingCardGroup.VotingCard_SubjectIDs.toString(),
                    distribute: false,
                    sips: 2,
                    subjectIDs: ["0"]
                },
                delaySipText: true
            }
        } as PollCard,
        {
            text: "Ever taken hard drugs?",
            sipText: "No? Good for you, please drink some alcohol 💊",
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
                delaySipText: true,
                sipConfig: {
                    group: VotingCardGroup.VotingCard_SubjectIDs.toString(),
                    distribute: false,
                    subjectIDs: ["1"]
                }
            }
        } as PollCard,
        // ------------------------------
        // - New Cards
        // ------------------------------
        {
            text: "Hey, remember me 🙉",
            color: "violet",
            title: "Follow Up Card",
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
            text: "%p0 your are crowned Thumb Master. Use your power to distribute 1 sip to those who don't follow your reign 👑",
            color: "violet",
            title: "Thumb Master 👍",
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
            text: "%p0 your reign as Thumb Master is over. Hopefully you used your power well 👌",
            color: "violet",
            title: "Thumb Master 👍",
            followUpCardID: 1,
            type: CardType.FreeText
        } as FreeTextCard, 
        {
            text: "Everyone now has the name of the person sitting to their left. You have to drink 1 sip for switching up names 🗿",
            color: "violet",
            title: "Confusion is fun, right?",
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
            text: "Okay this gets boring. You get your real names back 😘",
            color: "violet",
            title: "Confusion is fun, right?",
            followUpCardID: 2,
            type: CardType.FreeText
        } as FreeTextCard, 
        {
            text: "Hey gang, %p0 wants a drink. Mix up something good for them to enjoy 🧉",
            color: "violet",
            title: "Mix it up 🍸",
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
            text: "Now it's your turn %p0. Choose someone to share half of the good stuff with 😈",
            color: "violet",
            title: "Mix it up 🍸",
            followUpCardID: 3,
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 it’s your lucky day! Now you are Question Master and everyone who answers one of your questions has to drink 2 sips ⁉️",
            color: "violet",
            title: "Question Master",
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
            text: "%p0 you are no longer Question Master 🗿",
            color: "violet",
            title: "Question Master",
            followUpCardID: 4,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Let’s make intoxicating yourself a little harder. Everyone is only allowed to drink with their none dominant hand 🫱",
            color: "violet",
            title: "Switch Up",
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
            text: "Which hand you drink with is again up to you. Did anyone spill something? 🫗",
            color: "violet",
            title: "Switch Up",
            followUpCardID: 5,
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "Hey guys good news, everyone got a promotion! Ammm that’s everyone but %p0 you slacker. You now have to address everyone as if they were your boss at work. 😪",
            color: "violet",
            title: "Promotions baby!",
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
            text: "Corporate Rules: On violation %p0 has to drink one sip 🍺",
            color: "violet",
            title: "Promotions baby!",
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
            text: "Ah better late than never. %p0 you also got a promotion. Good work 😉",
            color: "violet",
            title: "Promotions baby!",
            followUpCardID: 7,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Guys did you hear dabbing is still cool. Everyone please do a dab before you drink or drink again. So cool 🙃",
            color: "violet",
            title: "Dabbing",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 8,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            text: "Okay i can't take it anymore. Please stop the dabbing. You are making fools of yourselfs 🤡",
            color: "violet",
            title: "Dabbing",
            followUpCardID: 8,
            type: CardType.FreeText
        } as FreeTextCard,
        {
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
            text: "%p0, if you have ever started a fight, take one sip, Rowdy! ⚔️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone who has already been to a strip club, drink 2 sips you dirty bastards 🏩",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 chooses a category. One by one, everyone says a word that fits this category until someone runs out of ideas 🧠",
            sipText: "That player gets to drink 4 sips 😘",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "Play a round of Chinese whispers. %p0 you start 😶",
            sipText: "Everyone who makes a mistake has to drink 2 sips 🍺",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, suddenly you have an urge for good humor. Everyone has to tell you a joke ✨",
            sipText: "The best comedian gets to distribute 3 sips 🎭",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0 and %p1, show me your powers of doing absolutely nothing. A starring contest will be perfect for that 👀",
            sipText: "Winner gets to distribute 2 sips and loser has to drink 2 😘",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "Everyone who wants to hook up today is allowed ahhh i mean required to drink 2 sips for \"better\" communication skills 🎙️ Good luck, you will need it 😘",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Hey %p0, throw a dice please. \n - First throw: Amount of sips 🍺\n - Second throw\n\t- 1 - 2: Drink your sips\n\t- 3 - 4: Distribute them\n\t- 5 - 6: Do the first throw again and sum up the amount of sips\n\nIf you don't have a dice, please continue 🎲",
            title: "Lucky Throw 🎲",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 9
                }
            }
        } as FreeTextCard,
        {
            text: "What do you mean, you don't have a dice? There are even apps for this. Finish your glas you lazy bastard 🦥<br><br>Just ignore this if you did the thing ☺️",
            title: "Lucky Throw 🎲",
            followUpCardID: 9,
            type: CardType.FreeText
        } as FreeTextCard,{
            text: "%p0, what's the longest distance you've walked out of your house wearing adidas Slides? 🩴",
            sipText: "The others will judge you by that and decide if you have to drink a sip 🤔",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, have you ever dated someone that was to old/young for you in hindsight? 🔞",
            sipText: "If so tell the story and drink to your former acquaintance 🗨️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, have you ever broken up with a text message? 📝",
            sipText: "If so drink 2 sips. Otherwise distribute them 💋",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Everyone who has cheated on someone in their life has to drink 5 sips, you dirty bastards 😡",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 drink 2 sips if you are currently not wearing any underwear 🩲",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 drink 2 sips if you ever left the house without any underwear 👙",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, give 3 sips to the most beautiful and 3 sips to the most ugly player. Who you mean exactly can remain a secret 🦢🦋",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, find a coin and flip it. If it says heads drink 2 sips. Otherwise give the coin to the player left of you. On every player switch the sips are increased by 2. Good luck 🪙",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, who do you think is more stingy, %p1 or %p2? 🤑",
            sipText: "They can take 2 sips 😶‍🌫️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, who do you think has more rizz, %p1 or %p2? 🫦",
            sipText: "They can take 2 sips 🥤",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Red Flags someone in this group experienced in a relationsship. If you repeat or can’t think of something new you loose. %p0, you begin 🚩",
            sipText: "Ah and looser takes 2 sips 😗",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Things %p0 likes in potential partners. If you repeat something, can’t think of something new or %p0 thinks you talk nonsense you loose. %p1, you begin 💄",
            sipText: "Ah and looser takes 2 sips 😗",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 you are planning on investing in stocks. %p1 and %p2 both know the market. Who will be your investment guru? 📈",
            sipText: "Drink to your future profits 🥂",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 what was the last romantic gesture you’ve made recently? 🌹",
            sipText: "Tell or take 3 sips! 🗣️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 what is the last thing that you came to regret? 😞",
            sipText: "Tell or take 3 sips! 🗣️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Do you think you belong to the smarter half of the group? Everybody, count down and on the count of three, raise your hand if you are convinced of your intelligence 🧠",
            sipText: "All the bright sparks will take a sip to even out the IQ gap 🤪",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, for every player who has spent a night at your place, you can give out a sip. But there’s a catch. If all your guests think you are a bad host, you take them yourself 🛎️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, tell us %p1’s age or drink 2 sips 🔞",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone who has ever stolen a traffic sign has to take a sip. Cheers to anarchy ⛔",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 you are in desperate need of a Wingwoman/Wingman. Would you rather choose %p1 or %p2 as your partner in crime? 🪽",
            sipText: "Drink 2 sips to a successful night out 🌃",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Who of you was the first to start drinking? The person with the most experience demonstrates their skill and takes two sips 👀",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Every clown that has entered a drive-in with a unsuitable vehicle like bike or scooter takes one sip 🛴",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone that currently wears different socks on purpose can distribute two sips 🌈",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Any beatboxers or singers among you? Please demonstrate your skills to us 🎤",
            sipText: "If you do so, you can distribute 2 sips each. Otherwise take them yourselfs 😌",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "And as next trick the incredible %p0 will make their drink disappear 🪄",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Hey %p0, compliment the person on your right and insult the person on your left 🧚‍♀️",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Drink if you ever had a pregnancy scare 🍼",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, spell your full name backwards. Drink a sip for every mistake you make 🅰️",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, get a new drink and place it in front of you. Every time a yellow card appears the cup moves one player to the right. On every Player Voting Card the person with the cup takes a sip. Continue until cup empty 🥤",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "You are teleported in a slasher horror movie. %p0 becomes the cruel monster that will kill everyone of you. Who would be the perfect candidate for your first kill? ☠️",
            sipText: "Drink with your victim 🩸",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 and %p1 please switch seating, drinks and ah personality as well. Try to imitate the other person as good as you can 🪪",
            color: "violet",
            title: "Time for identity theft!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true,
                followUpCardConfig: {
                    followUpCardID: 10,
                    roundDelay: 10
                }
            }
        } as FreeTextCard,
        {
            text: "Identity theft is bad. %p0 and %p1 you get your own seat, drink and personality back 🔙",
            color: "violet",
            title: "Time for identity theft!",
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
            text: "Bad identity theft is worse. Everyone else, who did it better? The looser has to drink 3 sips 😙",
            color: "violet",
            title: "Time for identity theft!",
            followUpCardID: 11,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 is only allowed to speak about themselves in the third person 🕒",
            title: "3️⃣rd Person",
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
            text: "%p0 can start to talk normal again 😗",
            title: "3️⃣rd Person",
            color: "violet",
            followUpCardID: 12,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 you’ve got the eye of the tiger. If someone looks you straight in the eye and you notice it, you can hand out a sip to the person in question 👀",
            color: "violet",
            title: "Eye of the Tiger",
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
            text: "%p0 unfortunately you've lost the eye of the tiger and thus your powers 🍝",
            color: "violet",
            title: "Eye of the Tiger",
            followUpCardID: 13,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, suddenly you feel like Santa. Choose a player to sit on your lap 🎅",
            color: "violet",
            title: "Ho Ho Ho",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 14,
                    roundDelay: 10
                }
            }
        } as FreeTextCard,
        {
            text: "Okay Christmas is over people. Everyone can sit on their own again 🐒",
            color: "violet",
            title: "Ho Ho Ho",
            followUpCardID: 14,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, did you see the drinks of your friends? Yuck, disgusting. From now on you have to supply everyone with fresh and delicious beverages 😋",
            color: "violet",
            title: "Yuck",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 15,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            text: "Ufff %p0 didn't improve the situation with the drinks. Everyone is responsible for their own drinks again 🍹",
            color: "violet",
            title: "Yuck",
            followUpCardID: 15,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0, i know you feel lonely sometimes but that's okay. Choose a drinking buddy. They will support you by always drinking when you have to drink 🫂",
            color: "violet",
            title: "Drinking Buddies!",
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
            text: "All good things must end. %p0 you have to enjoy your drinks alone again 🥺",
            color: "violet",
            title: "Drinking Buddies!",
            followUpCardID: 16,
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Time to get creative %p0. You can create a rule for the game. Don't get to crazy though 😘",
            color: "violet",
            title: "New Rule!",
            type: CardType.FreeText,
            settings: {
                followUpCardConfig: {
                    followUpCardID: 17,
                    roundDelay: 15
                }
            }
        } as FreeTextCard,
        {
            text: "%p0 your rule is ineffective from now on. Hopefully you had some fun 📏",
            color: "violet",
            title: "New Rule!",
            followUpCardID: 17,
            type: CardType.FreeText
        } as FreeTextCard,
        {
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
            text: "Would you rather be a door or a Window? 🚪🪟",
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
            text: "Would you rather have Regeneration or Healing (you can't heal yourself)? ❤️‍🩹",
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
            text: "Wich power would you rather have?",
            type: CardType.Poll,
            subjects: [
                {
                    title: "Invisibility 🫥" 
                },
                {
                    title: "Super strength 💪"
                },
                {
                    title: "Flight 🚁"
                },
                {
                    title: "Teleportation 💨"
                },
                {
                    title: "Mind reading 🧠"
                },
                {
                    title: "Under water breathing 🌊"
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
                sipConfig: {
                    group: VotingCardGroup.VotingCard_SubjectIDs.toString(),
                    distribute: false,
                    sips: 3,
                    subjectIDs: ["0"]
                },
                delaySipText: true
            }
        } as PollCard,
        {
            text: "All those who have been skinny dipping take 3 sips 🌊",
            title: "Revealing",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone who took a video of the artist on their last concert has to drink 3 sips. Enjoy the moment you idiots 🎫",
            title: "Enjoy the moment",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone who has masturbated today drinks 2 sips 🫦",
            title: "Aha",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Everyone who has lied today either comes clean or takes 3 sips 🤥",
            title: "That’s ignorant",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "The person with the emptiest drink has to finish it and get a new one 🥴",
            title: "Half empty",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, congrats on your beautiful new child. I’ve heard you need someone for babysitting. %p1 and %p2 are the perfect candidates for the job so who’s your pick? ⛏️",
            title: "Babysitting",
            sipText: "Toast to your newborn 🍼",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "Everyone who wants or has kids takes 1 sip 🚸",
            title: "Aww children",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "💛🤍💜🖤<br>Non Binary Players, raise your glasses 🍷",
            title: "Raise your glasses",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "The floor is Lava. The last one to touch the ground looses 🌋",
            title: "Ahh that’s hot",
            sipText: "Someone please help the burn victim drink 3 sips 🫶",
            type: CardType.FreeText,
        } as FreeTextCard,
        {
            text: "%p0, count the letters of your first and last name. This is the amount of sips you are allowed to distribute 📛",
            title: "Letters",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "The last person to have a blackout from too much alcohol drinks 2 sips. If none of you has ever had a blackout, everyone drinks 🤯",
            title: "Blackout",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, get a new drink and place it in the middle. If someone wants to go to the toilet, they have to finish this drink first. After the person has finished their business, they can refill the drink if they want to. 🚽🧻",
            title: "Toilet break is over",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
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
        "Each round a new question is drawn from the deck",
        "Every player can answer the question but it is not mandatory",
        "After that a new card is drawn. There is no winner, it's just about fun :)",
        "Be sure to support the original askhole creators!  \nhttp://web.askhole.io/"
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
export const testingDeck: Deck = {
    icon: "🍰",
    name: "Testing Deck",
    description: "Test the new specific player functionality & follow up card in a birthday themed deck",
    groundRules: [
        "**Specific Player**  \nChoose a player of your party to fill a specific spot in the cards",
        "**Follow Up Cards**  \nCards that consist of multiple cards which can accour with a delay",
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

export const leggitPartyDecks: Deck[] = [leggitPartyDeck, askhole, testingDeck];