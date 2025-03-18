import React, { useState } from "react";
import { debugData } from "./utils/debugData";
import { Box, Flex } from "@chakra-ui/react";
import { useNuiEvent } from "./hooks/useNuiEvent";
import Handling_editor from "./views/Handling_editor";
import Sidemenu from "./views/Sidemenu";



// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);


const App: React.FC = () => {

  const [isVisible, setVisible] = useState(false);

  useNuiEvent<boolean>("setVisible", (data) => {
    setVisible(data);
  } );


  return (
    <>
        <Box 
          bg="black.200"
          h="100vh"
          style={{ visibility: isVisible ? 'visible' : 'hidden' } }
        >
          <Flex
            justifyContent={"space-between"}
            
          >
            <Box w="26%" m={2}>
              <Handling_editor />
            </Box>
            <Box w="26%" m={2}>
              <Sidemenu />
            </Box>
          </Flex>
        </Box>
    </>
  );
};
export default App;
