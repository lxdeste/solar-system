import { Card, Button, Grid } from "@mantine/core";
function AstronomicalBodyList({
  options,
  onClick,
}: {
  options: { id: string; title: string }[];
  onClick: (astronomicalBodyName: string) => void;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          {options.map((option) => {
            return (
              <Card p="lg">
                <Card.Section>
                  <Button
                    key={option.id}
                    onClick={() => {
                      onClick(option.id);
                    }}
                    fullWidth
                  >
                    {option.title}
                  </Button>
                </Card.Section>
              </Card>
            );
          })}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AstronomicalBodyList;
