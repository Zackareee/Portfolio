<script>
  import { Skeleton } from "$lib/components/ui/skeleton";
  import * as Card from "$lib/components/ui/card";
  import * as Collapsible from "$lib/components/ui/collapsible";
</script>

<Collapsible.Root>
  <Card.Root>
    <Card.Header>
      <Card.Title><Skeleton class="h-5 w-[200px]" /></Card.Title>
      <Card.Description><Skeleton class="h-4 w-[250px]" /></Card.Description>
    </Card.Header>
    <Card.Content>
      <p>
        <span class="d-inline-block mr-3">
          <Skeleton class="h-5 w-[100px]" />
        </span>
        <span style="float:right;" class="d-inline-block mr-3">
          <Skeleton class="h-5 w-[100px]" />
        </span>
      </p>
    </Card.Content>
  </Card.Root>
</Collapsible.Root>
