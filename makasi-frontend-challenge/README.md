# Frontend Challenge

### Clone repository

1. `git clone https://github.com/lauralana/frontend-challenge-makasi.git`.

2. `npm install`.

3. Environment Variables 

<details>
<summary>
    <strong>
      how to set you environment variable !
    </strong>
  </summary>
To run this application, you will need to set up a GitHub token for API requests!

Follow these steps:

<strong>Create a GitHub Token:</strong>
- Go to GitHub Settings > Developer Settings > Personal access tokens.
- Give your token a descriptive name.
(Select the scopes you need. For this application, the default scopes are sufficient.)
- Click "Generate token" and copy the generated token.
- Set Up Your .env File:

In the root directory of the project, create a `.env` file.

There is an `env.example` file in the project that you can use as a template. Rename it to .env or copy its contents into your new .env file.

Add your GitHub token to the .env file as follows:

`VITE_GITHUB_TOKEN=your_github_token_here`

This token is necessary for making authenticated requests to the GitHub API. Without this token, the application will not be able to fetch data from GitHub.

<details>
  <summary>
    <strong>Why Add a Token to a Public API ?</strong>
  </summary>
Although the GitHub API is public, it imposes rate limits on the number of requests you can make in an hour. By using a personal access token, you can increase this limit, allowing for more requests within the same time period. Additionally, an authenticated token ensures more reliable access and reduces the risk of hitting rate limits during development and use. This token also helps to secure your requests, providing a layer of authentication to your API interactions.
</details>

</details>

### To run the app on browser

```bash
  npm run dev
```

- Open [http://localhost:5173/](http://localhost:5173/) to see the app running on browser.

<h2> Technologies Used </h2>
<details>
  <summary>
    <strong>
      <a href="https://vitejs.dev" target="_blank">
          <img src='https://miro.medium.com/v2/resize:fit:640/1*InZw9eeTPgLEanlETUStKw.png' className="logo" alt="Vite logo" style="width: 50px;"/>
       </a>
       +
      <a href="https://react.dev" target="_blank">
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz34OmNVyIMh1rguNfXC3MBk7Qq3DTduJVVg&s' className="logo react" alt="React logo" style="width: 50px;"/>
      </a>
    </strong>
  </summary>

<br/>

<strong>Vite + React + TypeScript</strong>

- The application was configured with Vite as the build tool because of its extremely fast startup and instant reloading during development. This provided an agile and efficient development flow, especially for React-based projects.

<strong>TypeScript</strong>

- TypeScript was chosen to provide strong typing capabilities throughout the application, ensuring more reliable code and easier collaboration in a team environment.

<strong>Mantine UI</strong>

- Mantine UI was selected for its rich set of customizable React components, which enabled rapid prototyping and ensured consistent design patterns across the application.

<strong>Axios</strong>

- Axios was integrated for handling HTTP requests due to its simplicity, promise-based API, and ability to intercept requests and responses, making it suitable for communicating with APIs like GitHub's.

<strong>@tabler/icons-react</strong>

- @tabler/icons-react was utilized for its extensive collection of high-quality icons, offering flexibility and ease of use in integrating icons across various components.

<strong>@tabler/icons-react</strong>

- @tabler/icons-react was utilized for its extensive collection of high-quality icons, offering flexibility and ease of use in integrating icons across various components.

</details>
