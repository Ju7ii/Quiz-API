# Quiz API

The Quiz API provides access to a dynamic set of quiz categories and their corresponding questions. 
It is designed to be a flexible and scalable solution for retrieving quiz data through a set of well-defined RESTful endpoints.

<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Languages and Tools

### Languages:
JavaScript, NodeJS, Express.js

### Database:
SQLite

### Tools:
Git/GitHub, ![Thunder Client](https://www.thunderclient.com/)

<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

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
        "category": "YOUR_CATEGORY",
        "question": "YOUR_QUIZ_QUESTION",
        "answer1": "ANSWER_1",
        "answer2": "ANSWER_2",
        "answer3": "ANSWER_3",
        "answer4": "ANSWER_4",
        "correct_answer": NUMBER (1, 2, 3, 4)
    }
]
```
</details>



### Random Question Retrieval:

Retrieve quiz questions for a specific category by making a GET request to the corresponding endpoint.
For one request you will receive 10 randomly selected entries back.



### Testing Endpoints:

Various endpoints for testing the API making a GET request.<br>
Examples:
- Testing whether API is online
- How many data records are available in total



<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Base URL

```
https://quiz-ofe1.onrender.com
```

<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

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
| `GET` | `/api/food` | Gives back data from the food category |
| `GET` | `/api/geography` | Gives back data from the geography category |
| `GET` | `/api/history` | Gives back data from the history category |
| `GET` | `/api/music` | Gives back data from the music category |
| `GET` | `/api/science` | Gives back data from the science category |
| `GET` | `/api/space` | Gives back data from the space category |
| `GET` | `/api/sports` | Gives back data from the sports category |
| `GET` | `/api/technology` | Gives back data from the technology category |

<details>
  <summary>
    <strong>Expected sample response for the food quiz</strong>
  </summary>
  
```
{
  "message": "success",
  "data": [
    {
      "id": 25,
      "category": "food",
      "question": "What is the primary ingredient in the traditional Mexican dish 'guacamole'?",
      "answer1": "Tomatoes",
      "answer2": "Avocado",
      "answer3": "Onions",
      "answer4": "Cilantro",
      "correct_answer": 2
    },
    {
      "id": 23,
      "category": "food",
      "question": "What is the traditional Japanese soup made with miso paste and dashi broth?",
      "answer1": "Ramen",
      "answer2": "Udon",
      "answer3": "Soba",
      "answer4": "Miso soup",
      "correct_answer": 4
    },
    {
      "id": 15,
      "category": "food",
      "question": "Which country is known for its traditional dish 'poutine,' consisting of fries topped with cheese curds and gravy?",
      "answer1": "Italy",
      "answer2": "Canada",
      "answer3": "France",
      "answer4": "United States",
      "correct_answer": 2
    },
    {
      "id": 2,
      "category": "food",
      "question": "What is the main ingredient in the Indian dish 'dal makhani'?",
      "answer1": "Lentils",
      "answer2": "Chickpeas",
      "answer3": "Rice",
      "answer4": "Potatoes",
      "correct_answer": 1
    },
    {
      "id": 35,
      "category": "food",
      "question": "What is the traditional Brazilian dish made with black beans, pork, and sausage, usually served with rice?",
      "answer1": "Feijoada",
      "answer2": "Churrasco",
      "answer3": "Moqueca",
      "answer4": "Coxinha",
      "correct_answer": 1
    },
    {
      "id": 26,
      "category": "food",
      "question": "Which type of pasta is shaped like small rice grains?",
      "answer1": "Fusilli",
      "answer2": "Orzo",
      "answer3": "Cavatelli",
      "answer4": "Farfalle",
      "correct_answer": 2
    },
    {
      "id": 34,
      "category": "food",
      "question": "Which spice is often used in Indian cuisine and is known for its warm, earthy flavor?",
      "answer1": "Cumin",
      "answer2": "Coriander",
      "answer3": "Cardamom",
      "answer4": "Turmeric",
      "correct_answer": 1
    },
    {
      "id": 5,
      "category": "food",
      "question": "Which nut is used to make marzipan?",
      "answer1": "Peanut",
      "answer2": "Almond",
      "answer3": "Cashew",
      "answer4": "Walnut",
      "correct_answer": 2
    },
    {
      "id": 6,
      "category": "food",
      "question": "What is the national dish of Japan?",
      "answer1": "Sushi",
      "answer2": "Ramen",
      "answer3": "Tempura",
      "answer4": "Sashimi",
      "correct_answer": 1
    },
    {
      "id": 3,
      "category": "food",
      "question": "Which Italian city is famous for its prosciutto and Parmesan cheese?",
      "answer1": "Milan",
      "answer2": "Rome",
      "answer3": "Bologna",
      "answer4": "Naples",
      "correct_answer": 3
    }
  ]
}
```
</details>

<!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## License

[MIT](https://choosealicense.com/licenses/mit/)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
