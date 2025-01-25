
export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🧑‍🤝‍🧑',
        people:'2 People'
    },
    {
        id:3,
        title:'A Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 or 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🚢',
        people:'6 or 10 People'
    }
]

export const SelectBudgetOptions =[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },

]

export const AI_PROMPT = 
    `Generate a travel plan for the destination: {place} for {days} days. 
  Traveler type: {travelers}, with a {budget} budget. 
  Provide a list of hotel options including the name, address, and the most recent image URL (ensure the URL is working), geo coordinates, rating, price and descriptions. 
  Suggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {days} days, including the best time to visit. 
  Output in JSON format.
`;