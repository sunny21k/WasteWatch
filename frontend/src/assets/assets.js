import { FaTrashAlt, FaRecycle, FaTrophy } from "react-icons/fa";
import { RiCoinsLine } from "react-icons/ri";


// Menu links 
export const menuLinks = [
    {
        name: "Report Waste", 
        path: "/report-waste"
    },
    {
        name: "Collect Waste", 
        path: "/collect-waste"
    },
    {
        name: "Leaderboard", 
        path: "/leaderboard"
    },
    {
        name: "Rewards", 
        path: "/rewards"
    },
]


// Features for about page
export const features = [
    {
        title: "Report Waste Easily",
        description: "Quickly submit cleanup reports from your neighborhood and track your contributions.",
        icon: FaTrashAlt
    },
    {
        title: "Earn Rewards",
        description: "Get points for every contribution to waste management.",
        icon: RiCoinsLine
    },
    {
        title: "Help Clean the Community",
        description: "Take part in a movement that turns simple efforts into lasting environmental benefits.",
        icon: FaRecycle
    },

]

// Footer details
export const footerDetails = [
    {
        title: "Quick Links",
        links: ["Home", "Report Waste", "Collect Waste", "Leaderboard", "Rewards"]
    },
    {
        title: "Need Help?", 
        links: ["How It Works", "FAQ", "Support", "Contact Us"]
    },
    {
        title: "Follow Us", 
        links: ["Instagram", "Twitter", "Facebook", "Youtube"]
    }
]

// Fake Leaderboard data
export const leaderBoardData = [
    {
        id: 1,
        name: "Kieron Pittman",
        points: 1000,
    },
    {
        id: 2,
        name: "Ryan Goodman",
        points: 800,
    },
    {
        id: 3,
        name: "Ivan Thomson",
        points: 1410,
    },
    {
        id: 4,
        name: "Carl Cannon",
        points: 110,
    },
    {
        id: 5,
        name: "Kyle Sharpe",
        points: 450,
    },
]


// Fake Reports Data
export const fakeReports = [
  {
    id: 1,
    type: "Plastic Bottles",
    quantity: 5,
    location: "Brooklyn, NY",
    user: "Alice",
    status: "open",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    type: "Paper",
    quantity: 2,
    location: "Queens, NY",
    user: "Bob",
    status: "pending",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    type: "Metal Cans",
    quantity: 3,
    location: "Manhattan, NY",
    user: "Charlie",
    status: "collected",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    type: "Metal Cans",
    quantity: 3,
    location: "Manhattan, NY",
    user: "Charlie",
    status: "collected",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    type: "Plastic Bottles",
    quantity: 5,
    location: "Brooklyn, NY",
    user: "Alice",
    status: "open",
    image: "https://via.placeholder.com/150"
  },
];