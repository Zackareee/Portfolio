<script>
  export let md;
  import * as Card from "$lib/components/ui/card";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ChevronRight } from "lucide-svelte";
  import { GitForkIcon } from "lucide-svelte";
  import { getReadme } from "./get-readme-file.js";
  import { Github } from "lucide-svelte";

  let readmeContent = "";
  let readme_ids = [];
  function handleClick(fullName) {
    if (!(fullName in readme_ids)) {
      getReadme(fullName).then((result) => {
        readmeContent = result; // Update the variable with the fetched content.
        readme_ids[fullName] = marked.parse([result][0]);
        readme_ids = readme_ids;
        return readme_ids[fullName];
      });
    } else {
      return readme_ids.fullName;
    }
  }
</script>

<div style="display:inline-flex;" class="flex flex-wrap items-center">
  <Collapsible.Root style="padding:15px">
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <!-- TODO: make the title redirect to the github repo -->
          <ScrollArea
            class="w-[250px] whitespace-nowrap rounded-md"
            orientation="horizontal"
          >
            <div><a href="https://github.com/{md.full_name}">{md.full_name}</a></div>
          </ScrollArea>
        </Card.Title>
        <Card.Description style="width: 250px; height:100px">
          {#if md.description != null}
            {md.description}
          {/if}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
          {#if md.language !== null}
            <span class="d-inline-block">
              <img
                alt="{md.language.toLowerCase()} Icon"
                style="width:25px; display:inline-block;"
                src={`https://raw.githubusercontent.com/devicons/devicon/`
                + `master/icons/${md.language.toLowerCase()}/` 
                + `${md.language.toLowerCase()}-original.svg`}
              />
            </span>
            <span class="d-inline-block mr-3">
              <span>{md.language}</span>
            </span>
          {/if}
          <span style="float:right;" class="d-inline-block mr-3">
            <Button
              on:click={() => handleClick(md.full_name)}
              variant="outline"
              size="icon"
              class="w-7 h-7"
            >
              <Collapsible.Trigger>
                <ChevronRight class="h-5 w-5" />
              </Collapsible.Trigger>
            </Button>
          </span>
          <span style="float:right;" class="d-inline-block mr-3">
            <GitForkIcon class="h-5 w-5" />
            <span>{md.forks}</span>
          </span>
        </p>
      </Card.Content>
      <Card.Footer>
        <Collapsible.Content>
          <div style="max-width:100%">
            {#await readme_ids[md.full_name] != undefined}
              waiting
            {:then text}
              {@html readme_ids[md.full_name]}
            {/await}
          </div>
        </Collapsible.Content>
      </Card.Footer>
    </Card.Root>
  </Collapsible.Root>
</div>
