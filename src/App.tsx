import { Button, Container, Grid, ScrollArea } from "@mantine/core";
import { useState } from "react";

import astronomicalBodies from "./astronomicalBodyData";
import AstronomicalBodyInfo from "./components/AstronomicalBodyInfo";
import AstronomicalBodyList from "./components/AstronomicalBodyList";
import SolarSystem from "./components/SolarSystem";

const fullHeight = () => ({ height: "100%" });

function App() {
  const [bodyId, setBodyId] = useState("");
  const [listMode, setListMode] = useState<"list" | "view">("list");

  return (
    <Grid sx={() => ({ margin: 0, height: "100vh" })}>
      <Grid.Col span={4} sx={fullHeight}>
        <ScrollArea sx={fullHeight}>
          <Container p="md" sx={fullHeight}>
            {listMode === "view" && (
              <>
                <Button
                  mb={"md"}
                  onClick={() => {
                    setBodyId("");
                    setListMode("list");
                  }}
                >
                  Back
                </Button>
                <AstronomicalBodyInfo
                  bodyDetails={astronomicalBodies.find(
                    (body) => body.id === bodyId
                  )}
                />
              </>
            )}

            {listMode === "list" && (
              <AstronomicalBodyList
                options={astronomicalBodies}
                onClick={(id) => {
                  setBodyId(id);
                  setListMode("view");
                }}
              />
            )}
          </Container>
        </ScrollArea>
      </Grid.Col>

      <Grid.Col span={8} sx={() => ({ height: "100vh" })}>
        <SolarSystem
          bodyClicked={(id) => {
            setBodyId(id);
            setListMode("view");
          }}
          selectedBody={bodyId}
        />
      </Grid.Col>
    </Grid>
  );
}

export default App;
