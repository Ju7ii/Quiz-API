# Quiz API

The Quiz API provides access to a dynamic set of quiz categories and their corresponding questions. 
It is designed to be a flexible and scalable solution for retrieving quiz data through a set of well-defined RESTful endpoints.

<!--------->

## Languages and Tools

### Languages
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Database
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) 

### Tools
![GIT](https://img.shields.io/badge/Git-fc6d26?style=for-the-badge&logo=git&logoColor=white) 

<!--------->

## Features & Optimizations

### Dynamic Categories:
The API supports dynamically generated quiz categories, allowing for easy addition and removal of quiz topics.<br>
To create a new category, you just need to create a JSON file with the following format:

<details>
  <summary>
    <strong>JSON Format</strong>
  </summary>
  
```
[
    {
        "question": "What is the main ingredient in guacamole?",
        "answer1": "Tomatoes",
        "answer2": "Avocado",
        "answer3": "Onions",
        "answer4": "Cilantro",
        "correct_answer": 2
    }
]
```
</details>

### Question Retrieval:
Retrieve quiz questions for a specific category by making a GET request to the corresponding endpoint.

### Testing Endpoints:
Various endpoints for testing the API making a GET request.<br>
Examples:
- Testing whether API is online
- How many data records are available in total


<!--------->

## Base URL

```
https://quiz-ofe1.onrender.com
```

<!--------->

## API Endpoints

> [!IMPORTANT]
> If the API has been in standby mode for a long time, it will take a moment to respond

### Test API

| **Method** | **URL** | **Description** |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/test-database` | Tests whether the API is online |

<details>
  <summary>
    <strong>Expected Response</strong>
  </summary>

```
{
  "message": "Database is up!"
}
```
</details>

### Total Entries

| **Method** | **URL** | **Description** |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/count-total` | Returns the total number of tables and records |

<details>
  <summary>
    <strong>Expected Response</strong>
  </summary>

```
{
  "message": "success",
  "total_tables": 8,
  "total_entries": 400
}
```
</details>


### Quiz Endpoints

> [!NOTE]
> These are the 8 standard categories

| **Method** | **URL** | **Description** |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/food` | Gives back data from the requestet category |
| `GET` | `/api/geography` | Gives back data from the requestet category |
| `GET` | `/api/history` | Gives back data from the requestet category |
| `GET` | `/api/music` | Gives back data from the requestet category |
| `GET` | `/api/science` | Gives back data from the requestet category |
| `GET` | `/api/space` | Gives back data from the requestet category |
| `GET` | `/api/sports` | Gives back data from the requestet category |
| `GET` | `/api/technology` | Gives back data from the requestet category |

<details>
  <summary>
    <strong>Expected Response For Food Quiz</strong>
  </summary>
  
```
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "question": "What is the main ingredient in guacamole?",
      "answer1": "Tomatoes",
      "answer2": "Avocado",
      "answer3": "Onions",
      "answer4": "Cilantro",
      "correct_answer": 2
    },
    {
      "id": 2,
      "question": "Which type of pasta is shaped like small rice grains?",
      "answer1": "Fusilli",
      "answer2": "Orzo",
      "answer3": "Pennerigoni",
      "answer4": "Farfalle",
      "correct_answer": 2
    },
    {
      "id": 3,
      "question": "Which Italian city is famous for its prosciutto and Parmesan cheese?",
      "answer1": "Milan",
      "answer2": "Rome",
      "answer3": "Bologna",
      "answer4": "Naples",
      "correct_answer": 3
    },
    {
      "id": 4,
      "question": "What is the name of the traditional Scottish dish made from sheep's stomach stuffed with minced meat and oats?",
      "answer1": "Haggis",
      "answer2": "Black Pudding",
      "answer3": "Scotch Egg",
      "answer4": "Neeps and Tatties",
      "correct_answer": 1
    },
    {
      "id": 5,
      "question": "Which nut is used to make marzipan?",
      "answer1": "Peanut",
      "answer2": "Almond",
      "answer3": "Cashew",
      "answer4": "Walnut",
      "correct_answer": 2
    },
    {
      "id": 6,
      "question": "What is the national dish of Japan?",
      "answer1": "Sushi",
      "answer2": "Ramen",
      "answer3": "Tempura",
      "answer4": "Sashimi",
      "correct_answer": 1
    },
    {
      "id": 7,
      "question": "Which country is famous for its spicy cuisine, including dishes like kimchi and bulgogi?",
      "answer1": "China",
      "answer2": "Japan",
      "answer3": "South Korea",
      "answer4": "Thailand",
      "correct_answer": 3
    },
    {
      "id": 8,
      "question": "What is the main ingredient in the Mexican dish 'chiles en nogada'?",
      "answer1": "Chicken",
      "answer2": "Pork",
      "answer3": "Beef",
      "answer4": "Poblano peppers",
      "correct_answer": 4
    },
    {
      "id": 9,
      "question": "Which spice is derived from the Crocus sativus flower and is known for its vibrant color?",
      "answer1": "Turmeric",
      "answer2": "Cumin",
      "answer3": "Saffron",
      "answer4": "Paprika",
      "correct_answer": 3
    },
    {
      "id": 10,
      "question": "What is the main ingredient in the Middle Eastern dish 'hummus'?",
      "answer1": "Chickpeas",
      "answer2": "Lentils",
      "answer3": "Black beans",
      "answer4": "Kidney beans",
      "correct_answer": 1
    }
}
```
</details>


## License

[MIT](https://choosealicense.com/licenses/mit/)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
