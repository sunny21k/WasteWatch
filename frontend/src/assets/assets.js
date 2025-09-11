import { FaTrashAlt, FaRecycle, FaTrophy } from "react-icons/fa";
import { RiCoinsLine } from "react-icons/ri";

export const menuLinks = [
    {
        name: "Report Waste", 
        path: "/report"
    },
    {
        name: "Collect Waste", 
        path: "/collect"
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