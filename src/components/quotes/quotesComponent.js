import { View, Text } from 'react-native'
import React from 'react'

const QuotesComponent = () => {

    const quotes = [
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "Pain is temporary. Quitting lasts forever.",
        "The difference between try and triumph is a little 'umph'.",
        "Every workout is progress.",
        "Sweat is just fat crying.",
        "No pain, no gain.",
        "If it doesn’t challenge you, it doesn’t change you.",
        "Success starts with self-discipline.",
        "Strength does not come from the physical capacity. It comes from an indomitable will.",
        "Get comfortable with being uncomfortable.",
        "Fall in love with taking care of your body.",
        "Push yourself because no one else is going to do it for you.",
        "Results happen over time, not overnight. Work hard, stay consistent, and be patient.",
        "Don't wish for a good body, work for it.",
        "If you still look good at the end of your workout, you didn’t train hard enough.",
        "When you feel like quitting, think about why you started.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "Slow progress is better than no progress.",
        "Don't count the days, make the days count.",
        "You are so much stronger than you think.",
        "The body achieves what the mind believes.",
        "Fitness is not a destination. It's a journey.",
        "The hardest lift of all is lifting your butt off the couch.",
        "Make yourself proud.",
        "Suffer the pain of discipline or suffer the pain of regret.",
        "It never gets easier, you just get stronger.",
        "Your only limit is you.",
        "You don't have to be great to start, but you have to start to be great.",
        "Respect your body. It's the only one you get.",
        "Act like a horse. Be dumb. Just run.",
        "Hard work beats talent when talent doesn't work hard.",
        "Conquer yourself and the world lies at your feet.",
        "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
        "It’s not about having time. It's about making time.",
        "What hurts today makes you stronger tomorrow.",
        "Do something today that your future self will thank you for.",
        "The only limits you have are the limits you believe.",
        "Whether you think you can or think you can't, you're right.",
        "Your mind gives up before your legs do.",
        "The only bad workout is the one you didn't do.",
        "The beginning is always tough. But once you're in it, you become unstoppable.",
        "It's a slow process, but quitting won't speed it up.",
        "Success isn't always about greatness. It's about consistency.",
        "Nothing truly great ever came from a comfort zone.",
        "To change your body, you must first change your mind.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Strong is what happens when you run out of weak.",
        "Never give up on a dream just because of the time it will take to accomplish it.",
        "A one-hour workout is just 4% of your day.",
        "Exercise is therapy.",
        "You have a choice. You can throw in the towel or use it to wipe the sweat off your face.",
        "Lack of activity destroys the good condition of every human being.",
        "Strive for progress, not perfection.",
        "If you're tired of starting over, stop giving up.",
        "Work hard in silence. Let success be your noise.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Every champion was once a contender that refused to give up.",
        "Push yourself to your limits. That’s how you truly grow.",
        "Don't limit your challenges, challenge your limits.",
        "You don't get what you wish for. You get what you work for.",
        "Doubt kills more dreams than failure ever will.",
        "The best project you'll ever work on is you.",
        "Believe you can and you're halfway there.",
        "Run when you can, walk if you have to, crawl if you must; just never give up.",
        "Believe in yourself and all that you are.",
        "Work out. Eat well. Be patient. Your body will reward you.",
        "Stop waiting for things to happen. Go out and make them happen.",
        "A journey of a thousand miles begins with a single step.",
        "Pain is temporary. Glory is forever.",
        "Challenges are what make life interesting. Overcoming them is what makes life meaningful.",
        "If you think lifting is dangerous, try being weak. Being weak is dangerous.",
        "What's important is to get into shape and then not to have to worry about it. I don't want to get on stage and not be able",
    ]

    // To get a random quote from the array:
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(randomQuote);


    return (
        <View className='bg-gray-800 flex-1 mx-4 my-2 rounded-2xl'>
            <View className='py-2 px-2 my-1 mx-1'>
                <Text className='text-white text-base mb-2'>⚔️ Motivation</Text>
                <Text className='text-white text-center'>{randomQuote}</Text>
            </View>
        </View>
    )
}

export default QuotesComponent