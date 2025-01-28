import rating from './rating_starts.png'
import addicon from './add_icon_green.png'
import removeicon from './remove_icon_red.png'

import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'
import menu_9 from './menu_9.jpg'

import rest_1 from './rest_1.jpg'
import rest_2 from './rest_2.avif'
import rest_3 from './rest_3.avif'
import rest_4 from './rest_4.avif'
import rest_5 from './rest_5.jpg'
import rest_6 from './rest_6.avif'
import rest_7 from './rest_7.jpg'
import rest_8 from './rest_8.jpg'


import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'

export const assets={

}

export const menu_list= [
    {
        id:1,
        menu_name: "Salad",
        menu_image: menu_1
    },
    {
        id:2,
        menu_name: "Rolls",
        menu_image: menu_2
    },
    {
        id:3,
        menu_name: "Waffles",
        menu_image: menu_3
    },
    {
        id:4,
        menu_name: "Sandwich",
        menu_image: menu_4
    },
    {
        id:5,
        menu_name: "Cakes",
        menu_image: menu_5
    },
    {
        id:6,
        menu_name: "Meals",
        menu_image: menu_6
    },
    {
        id:7,
        menu_name: "Pasta",
        menu_image: menu_7
    },
    {
        id:8,
        menu_name: "Chinese",
        menu_image: menu_8
    },
    {
        id:9,
        menu_name: "Biryani",
        menu_image: menu_9
    },
]

export const restaurant_list = [
    {
        rest_name: "Imli Sarai",
        rest_img: rest_1,
        rest_desc: "Farm to Table restaurant serving European Cuisine & Speciality Coffees.",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "Amritsar Haveli",
        rest_img: rest_2,
        rest_desc: "Authentic Punjabi food and vibrant interiors make this a must-visit spot for all food lovers.",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "Clove",
        rest_img: rest_3,
        rest_desc: "Fusion dining experience offering a blend of international and traditional cuisines.",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "Barbeque Nation",
        rest_img: rest_4,
        rest_desc: "Interactive dining with live grills at your table and an array of unlimited dishes.",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "Brick & Branch",
        rest_img: rest_5,
        rest_desc: "Brick & Branch sets the standard for what a cocktail bar should be.",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "A'La Liberty",
        rest_img: rest_6,
        rest_desc: "A' La Liberty is a fine dining outlet that offers a unique and luxurious dining experience. The restaurant is designed to provide a warm and inviting atmosphere",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "Ohri's Eatmor",
        rest_img: rest_7,
        rest_desc: "A' La Liberty is a fine dining outlet that offers a unique and luxurious dining experience. The restaurant is designed to provide a warm and inviting atmosphere",
        rest_address:"Hyderabad"
    },
    {
        rest_name: "AB's Absolute Barbeques",
        rest_img: rest_8,
        rest_desc: "A' La Liberty is a fine dining outlet that offers a unique and luxurious dining experience. The restaurant is designed to provide a warm and inviting atmosphere",
        rest_address:"Hyderabad"
    },

]

export const food_list = [
    {
        
        id: 1,
        fname: "Greek Salad",
        image: food_1,
        price: 100,
        description: "Contains essential nutrients and healthy",
        rating: rating,
        add : addicon,

    },
    {
        id: 2,
        fname: "Veg Salad",
        image: food_2,
        price: 120,
        description: "Contains essential vegetables and fruitd nutrients and healthy",
        rating: rating,
        add : addicon,

    },
    {
        id: 3,
        fname: "Onion & Mushroom Salad",
        image: food_3,
        price: 100,
        description: "Contains only Onions & Mushrooms essential nutrients and healthy",
        rating: rating,
        add : addicon,

    },
    {
        id: 4,
        fname: "Tomato Salad",
        image: food_4,
        price: 120,
        description: "Contains only tomatoes and pepper essential nutrients and healthy",
        rating: rating,
        add : addicon,

    },
    {
        id: 5,
        fname: "Mixed Roll",
        image: food_5,
        price: 40,
        description: "Mixed veg and non-veg roll",
        rating: rating,
        add : addicon,

    },
    {
        id: 6,
        fname: "Chicken Roll",
        image: food_6,
        price: 60,
        description: "Crispy chicken surrounded with roll",
        rating: rating,
        add : addicon,

    },
    {
        id: 7,
        fname: "Egg Roll",
        image: food_7,
        price: 70,
        description: "Half boiled egg surrounded with roll",
        rating: rating,
        add : addicon,

    },
    {
        id: 8,
        fname: "Veg Roll",
        image: food_8,
        price: 80,
        description: "Boiled vegetables surrounded with roll",
        rating: rating,
        add : addicon,

    }
]

export const add = [
    {
        add : addicon,
    }
]

export const remove = [
    {
        remove : removeicon,
    }
]

export const rate = [
    {
        rate : rating
    }
]