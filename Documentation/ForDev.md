# Welcome to my website!

To access my website, click the link: [Gyn GPT](https://gyn-gpt.vercel.app/)

**Instructions:**

1. **Presequite**

- git
- npm
- NodeJS

2. **Installation**:

- Open terminal, navigate through your folder by `cd` command and follow the following step:
- Clone the repository:

```
git clone https://github.com/TheCodister/GynGPT.git
```

- Navigate to project root:

```
cd GynGPT
```

- Install the package:

```
npm install
```

3. **Running the Application:** Since the backend of this application has already been deployed, run `npm run dev`. Then, follow the link provided in the terminal to view the UI.

4. **Components:**

- **Chatpart:** This is where the output of the prompt and result will be displayed.
- **Choosemodel:** Click here to select the model you want to use.
- **Message:** Displays messages during prompting.
- **Navbar:** Contain only a new chat button and a section where I suppose to build the chat history (For future development).
- **Startmessage:** Initial message displayed when you first enter the website.
- **Suggestion:** Includes suggestions and a welcoming message when first entering the chat section.
- **Themebutton:** Button group to choose theme.
- An index.jsx file can be found to help import all the component much easier.

5. **Configuration:**

- **Gemini.js:** Configuration for the Gemini 1.5 Pro model, all documentation is here: https://ai.google.dev/gemini-api/docs/api-overview and to this video: https://www.youtube.com/watch?v=0yboGn8errU&t=5323s.
- **Dwarves.js:** Stores data for the Dwarves Foundation handbook and handles prompts and results for Dwarves Bot 1.0, we do this base on Gemini API tuning which can be found at: https://ai.google.dev/.

6. **Context:**

- This is where all states and functions are stored to handle input and output of the model. It's also where all the UI features are set up.

- We have 3 main function in this file: **onSent()** which will handle input and output of Gemini AI, **handleMessage()** will handle input, output and send and receive data from OpenAI API and ?**onSentDwarves()** will handle input and output of Dwarves Bot 1.0, which is a tuning Gemini model.

7. **App.jsx:**

This is where all the pieces of the application are connected.

8S. **index.css**

This is where all the global.css stay.

_Note:_ In this project, I've utilized ReactJS, Tailwind CSS, Material UI, React Spinner library, ExpressJS backend (for GPT-3.5 model), Gemini Tuning (for training handbook data), Vercel for deploying frontend, and Render for deploying backend. Since this is my first time working with a model, the result of the bot can sometimes contain noise and can take long to generate result.

Enjoy coding!

Thank you for visiting.
