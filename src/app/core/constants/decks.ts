import { CardType } from "../models/enums";
import { Deck, FreeTextCard, PlayerVotingCard, PlayerVotingSipMode } from "../models/interfaces";

// Test Decks
export const partyDeck: Deck = {
    icon: "🎉",
    name: "Party Game",
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
                order: 1,
                selfVoteDisabled: true,
                isAnonymous: true,
                payToDisplay: true
            }
        } as PlayerVotingCard,
        {
            text: "Zweiter :) - %p0 is a echter Wappla",
            type: CardType.PlayerVoting,
            settings: {
                order: 2,
                selfVoteDisabled: false,
                sipConfig: {
                    sipMode: PlayerVotingSipMode.LeastVoted
                }
            }
        } as PlayerVotingCard,
        {
            text: "Dritter :)",
            type: CardType.FreeText,
            settings: {
                order: 3
            }
        } as FreeTextCard
    ],
    speficPlayerMandatory: false
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
    speficPlayerMandatory: false
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
    speficPlayerMandatory: true
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
    speficPlayerMandatory: false
};
export const drinkingDeck: Deck = {
    icon: "🍻",
    name: "Drinking Game",
    description: "Party hard!",
    cards: [
        {
            text: "%p0 trink fünf Schlücke :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard
    ],
    speficPlayerMandatory: false
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
    speficPlayerMandatory: false
};

// Leggit Decks
export const leggitPartyDeck: Deck = {
    icon: "🪅",
    name: "Party Game",
    description: "Very funny Party Game",
    cards: [
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
            text: "Which one of you would be most qualified to be the lead actor in a porn movie?",
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
                isAnonymous: true
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
            text: "%p0 give four sips to the player you know best",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Give 3 sips to one person if you are not in a relationship.",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Let's distribute some sips! Everyone choose someone to down 3 of them :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 a sorrow shared is a sorrow halved. Drink 2 and distribute 2",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 you have the chance to get really disliked by a player! Choose one player to down 6 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 you are too sober, have three sips :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, time to spin the bottle. If the person chooses dare, feel free to hand out 8 sips to them :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, you're in jail with a player? Drink 2 sips with your cellmate!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, you accidentally killed someone at work. Drink 2 sips with the colleague who would most likely never talk about it",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, drink with the person who is most likely to do weird things in public",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, you're robbing a supermarket. Drink with the confused player who is supposed to be in charge of security that day",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, pick a best man or maid of honor and drink to your wedding",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, the person to your left looks very thirsty. Pass out a 2 sips",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, the desire to marry has taken hold of you. Make a convincing marriage proposal to the person on your left. In return you may hand out 3 sips to drink :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, if you could do anything without suffering the consequences, what would you do right now? Tell or drink 2 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0, if you could punch someone without having to suffer the consequences, who would your choice be? Tell or drink 2 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "The smallest player badly needs 4 sips for growth.",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 swap your top or pants with %p1 for the rest of the game. For this you may distribute 5 sips each. If someone refuses the person has to drink 3 sips",
            // ToDo: Idea for free text card. Split "If someone refuses ..." away from here. Show all players, who are not involved in this card the text.
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 distribute 2 sips to a player thinner than you. If that is not possible drink yourself :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "All those who can't manage to stand on one leg for one minute have to one sip",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "All who manage to do a bottle flip on the first try may distribute 4 sips :*",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 distribute 2 sips to the player who is smarter than you. If that is not possible, drink them yourself!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 if you had to leave the planning of your wedding to either %p1 or %p2, who would you choose? Drink to your wedding with this person :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 if you had to leave the planning of your next vacation to either %p1 or %p2, who would you choose? Drink with that person! :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 if you had to leave the planning of your next birthday party to either %p1 or %p2, who would you choose? Drink with that person! :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 imitate another player. The first to guess the player gets to distribute 4 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 guess the color of %p1's underwear. Are you right? Distribute 4 sips, otherwise drink them yourself :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "The player who was on vacation most recently drinks 2 sips!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Men raise your glasses. 3 sips for you!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Women raise your glasses. 3 sips for you!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 do me a favor and start a waterfall :)",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "%p0 and %p1: Rock, Paper, Scissors Duel! Loser drinks 3 sips.",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard,
        {
            text: "Make a group selfie :)",
            type: CardType.FreeText
        } as FreeTextCard,
        {
            text: "%p0 Roses are red, violets are blue ... finish the poem and give out 4 sips. Otherwise, drink them yourself!",
            type: CardType.FreeText,
            settings: {
                drinkingCard: true
            }
        } as FreeTextCard
    ],
    groundRules: [
        "- **Reminder**  \n- The game is currently under development so the features are limited",
        "Thanks for testing out my game btw. :)"
    ],
    speficPlayerMandatory: false
};