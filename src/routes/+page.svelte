<script>
  import Skeleton from './gitcard.skeleton.svelte';
  import GitCard from './gitcard.card.svelte';
  import DarkMode from "./darkmode.svelte";
  import LanguageIcon from "./language-icon.svelte";
  import { getRepos } from "./get-repo-list.js";
  import { Github } from "lucide-svelte";
  import { Download } from "lucide-svelte";
  import { LucideLinkedin } from "lucide-svelte";
 

  // We define a promise here so we can use the svelte {#await} later on
  const PROMISE = getRepos();
  const USERNAME = "zackareee";
  const LINKEDIN = "https://linkedin.com/in/💻👨‍💻zackaree-kendall-king-576311227"
  const NAME = "Zackaree";
  const LANGUAGES = [
    "python",
    "javascript",
    "java",
    "react",
    "svelte",
    "c",
    "csharp",
    "kubernetes",
    "docker",
  ];
</script>

<!-- We define the header here, because otherwise it defaults to nothing -->
<svelte:head>
  <title>Home</title>
  <meta name="description" content="Zack's Portfolio" />
</svelte:head>


<!-- 
  We use a table in this code to keep the avatar and username/discription 
  aligned. 
-->
<section>
  <DarkMode />
  <h1>
    <span>
      <div>
        <table>
          <tbody>
            <tr>
              <td rowspan="2">
                <img
                  alt="avatar"
                  style="padding:1vw; position:relative; min-width:200px; 
                  max-width:400px"
                  src="https://avatars.githubusercontent.com/{USERNAME}"
                  class="overflow-hidden rounded-full"
                />
              </td>
              <td style="vertical-align:bottom;">
                <h1
                  class="scroll-m-20 text-3xl font-extrabold tracking-tight
                  lg:text-5xl"
                >
                  {NAME}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding-top:1vh">
                <h2 class="scroll-m-20 text-1xl tracking-tight lg:text-2xl">
                  Software Engineer
                </h2>
              <div class="flex-container" >
                <a href="https://github.com/{USERNAME}">
                  <Github class="p-1 mt-2 h-10 w-10" />
                </a>
                <a href="{LINKEDIN}">
                  <LucideLinkedin class="p-1 mt-2 h-10 w-10" />
                </a>
              </div>
              <div class="flex-container mt-10 " >
                <h3 class="scroll-m-20 text-1xl tracking-tight lg:text-2xl">
                  Resumé
                </h3>
                <a href="/CV.pdf" download>
                  <Download class="p-1 h-8 w-8" />
                </a>
              </div>
              
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </span>
  </h1>

  <div 
    class="flex-container border-b"
    style="padding-top:5vh; padding-bottom:2vh"
  >
    {#each LANGUAGES as language}
      <LanguageIcon {language} />
    {/each}
  </div>
  <br />
  <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    <a href="https://github.com/{USERNAME}">Github</a>
  </h2>
  <br />
  <table class="w-full">
    <tbody>
      <!-- 
        We have a skeleton object here while we await for the promise return. 
        This is so the user knows the page is still loading. 
      -->
      {#await PROMISE}
        <div class="flex flex-wrap items-center">
          {#each { length: 5 } as _, i}
            <div style="padding:15px; display:inline-flex">
              <Skeleton />
            </div>
          {/each}
        </div>
      {:then readme}
        {#each readme as md}
            <GitCard {md} />
        {/each}
      {:catch error}
        <p>error = {error.message}</p>
      {/await}
    </tbody>
  </table>
</section>

<style>
  .flex-container {
    display: flex;
  }

  .flex-container > div {
    padding-left: 1vw;
    padding-right: 1vw;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: contents;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
