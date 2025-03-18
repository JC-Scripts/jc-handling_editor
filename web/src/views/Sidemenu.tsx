import { Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Exporter from '../components/sidemenu/Exporter'


function Sidemenu() {
  console.log("-------- Sidemenu.tsx ---------")

  return (
      <Container p={2} pt={4} backgroundColor= "rgba(26, 32, 44, 0.95)" h="97vh">
        <Tabs isFitted variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab>Export</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Exporter />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
  )
}

export default Sidemenu
