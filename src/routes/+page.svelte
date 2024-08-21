<script>
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Table from "$lib/components/ui/table";
  import MarkdownIt from "markdown-it";
  import my_markdown from "./BEACONPLACEMENT.md?raw";
  import * as Card from "$lib/components/ui/card";
  import * as Collapsible from "$lib/components/ui/collapsible";

  const md = new MarkdownIt();
  import { marked } from 'marked';
  import { onMount } from 'svelte';
  import { getReadmes } from './util.js';
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { ChevronRight  } from "lucide-svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { getReadme } from './util-3.js';
  import { getRepos } from './util-2.js';

  let promise = getRepos();


  let username = "zackareee";
  let name = "Zackaree";
  let languages = ["python","javascript","java","react","svelte","c","csharp", "kubernetes", "docker"];
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Sun } from "lucide-svelte";
  import { Moon } from "lucide-svelte";
  import { GitForkIcon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
    import { getPreviousFocusable } from "@melt-ui/svelte/internal/helpers";
  let readmeContent = '';
  let readme_ids = []
  function handleClick(fullName) {
    if (!(fullName in readme_ids)) {
      getReadme(fullName)
      .then(result => {
        readmeContent = result; // Update the variable with the fetched content
        readme_ids[fullName] = marked.parse([result][0]);

        readme_ids = readme_ids
        return readme_ids[fullName]
      })
      
    }
    else {return readme_ids.fullName}
  }
  
  async function getpage(full_name) {
    return readme_ids.full_name
  } 
  



</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Zack's Portfolio" />
</svelte:head>

<section>



  <Button on:click={toggleMode} variant="outline" size="icon">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>

  <h1>
    <span class="welcome">
      <div>
        <table>
          <tbody>
            <tr>
              <td rowspan=2>
                <img style="padding:1vw; position:relative; min-width:200px; max-width:400px" src="https://avatars.githubusercontent.com/{username}" class="overflow-hidden rounded-full"/>
              </td>
              <td style="vertical-align:bottom;">
                <h1  class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl" >{name}</h1>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top; padding-top:1vh">
                <h2 class="scroll-m-20 text-1xl tracking-tight lg:text-2xl" >Software Engineer</h2>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </span>
  </h1>



        <div class="flex-container border-b" style="padding-top:5vh; padding-bottom:2vh">
          { #each languages as language}

   

          <Tooltip.Root>
            <Tooltip.Trigger>
              <div>
                <img style="width:100px;" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/{language}/{language}-original.svg">  
              </div>
           </Tooltip.Trigger>
            <Tooltip.Content>
              {language}
            </Tooltip.Content>
          </Tooltip.Root>



                  
          { /each } 
        </div>
        <br>
        <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Github
        </h2>
        <br>

      
          
          
        
        <table class="w-full">
          <tbody>
            
            {#await promise}
              <div class="flex flex-wrap items-center">
                {#each {length: 5} as _, i}
                  <div style="padding:15px; display:inline-flex">
                    <Collapsible.Root>
                      <Card.Root>
                        <Card.Header>
                          <Card.Title><Skeleton class="h-5 w-[200px]" /></Card.Title>
                          <Card.Description><Skeleton class="h-4 w-[250px]" /></Card.Description>
                        </Card.Header>
                        <Card.Content>
                          <p>
                            <span style="display: inline-block;" class="d-inline-block mr-3">
                              <Skeleton class="h-5 w-[100px]" />
                            </span>
                            <span style="display: inline-block; float:right;" class="d-inline-block mr-3">
                              <Skeleton class="h-5 w-[100px]" />
                            </span>
                          </p>
                        </Card.Content>
                      </Card.Root>
                    </Collapsible.Root>
                  </div>
                {/each}
              </div>
            {:then readme}
              { #each readme as md}
              

                <div style="display:inline-flex;" class="flex flex-wrap items-center">
                  <Collapsible.Root style="padding:15px">
                    <Card.Root>
                      <Card.Header>
                        <Card.Title>
                          <ScrollArea
                          class="w-[250px] whitespace-nowrap rounded-md"
                          orientation="horizontal"
                        >
                          <div>
                            {md.full_name}
                          </div>
                          </ScrollArea>
                        </Card.Title>
                        <Card.Description style=" width: 250px; height:100px ">{#if md.description != null }{md.description}{/if}</Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <p>
                          <span class="d-inline-block">
                            <img style="width:25px; display:inline-block;" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/{md.language.toLowerCase()}/{md.language.toLowerCase()}-original.svg">
                          </span>
                          <span class="d-inline-block mr-3">
                            <span >{md.language}</span>
                          </span>
                          <span style="float:right;" class="d-inline-block mr-3">
                            <span >
                              <Button on:click={() => handleClick(md.full_name)} variant="outline" size="icon" class="w-7 h-7" > 
                                <Collapsible.Trigger>
                                  <ChevronRight  style="display:inline;" class="h-5 w-5" /> 
                                </Collapsible.Trigger>
                              </Button>
                            </span>
                          </span>
                          <span style="float:right;" class="d-inline-block mr-3">
                            <span ><GitForkIcon style="display:inline;" class="h-5 w-5" /> </span>
                            <span >{md.forks} </span>
                          </span>
                        </p>
                      </Card.Content>
                      <Card.Footer>
                          <Collapsible.Content>
                            <div style="max-width:100%">
                              {#await (readme_ids[md.full_name] != undefined)}
                                waiting
                              {:then text}
                                {@html readme_ids[md.full_name]}
                              {/await}
                            </div>
                            <!-- {@html marked.parse(my_markdown)} -->
                          </Collapsible.Content>
                        
                      </Card.Footer>
                    </Card.Root>
                  </Collapsible.Root>
                </div>
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
    padding-left:1vw;
    padding-right:1vw
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
