<script>
  import * as Tooltip from "$lib/components/ui/tooltip";
  export let language; // You can pass the language as a prop
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div>
      <img
        alt="{language} Icon."
        style="width:100px;"
        src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/`
        + `${language}/${language}-original.svg`}
      />
    </div>
  </Tooltip.Trigger>
  <Tooltip.Content>
    {language}
  </Tooltip.Content>
</Tooltip.Root>
