# Welcome to my website!

To access my website, click the link: [Gyn GPT](https://gyn-gpt.vercel.app/)

**Instructions:**

1. **Running the Application:** Since the backend of this application has already been deployed, navigate to this repository and run **npm run dev**. Then, follow the link provided in the terminal to access the UI.

2. **Components:**

- **Chatpart:** This is where the output of the prompt and result will be displayed.
- **Choosemodel:** Click here to select the model you want to use.
- **Message:** Displays messages during prompting.
- **Navbar:** Use this to navigate through the application.
- **Startmessage:** Initial message displayed when you first enter the website.
- **Suggestion:** Includes suggestions and a welcoming message when first entering the chat section.
- **Themebutton:** Click here to choose a theme.

3. **Configuration:**

- **Dwarves.js:** Stores data for the Dwarves Foundation handbook and handles prompts and results for Dwarves Bot 1.0.
- **Gemini.js:** Configuration for the Gemini 1.5 Pro model.

4. **Context:**

This is where all states and functions are stored to handle input and output of the model. It's also where all the UI features are set up.

5. **App.jsx:**

This is where all the pieces of the application are connected.

_Note:_ In this project, I've utilized ReactJS, Tailwind CSS, Material UI, React Spinner library, ExpressJS backend (for GPT-3.5 model), Gemini Tuning (for training handbook data), Vercel for deploying frontend, and Render for deploying backend. Since this is my first time working with a model, the result of the bot can sometimes contain noise.

Enjoy coding!

Thank you for visiting.
