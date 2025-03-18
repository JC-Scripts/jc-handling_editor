import { Box, Container, Divider, VStack } from '@chakra-ui/react'
import { Attributes_editor, Navbar, Editor_info } from '../components/editor'

function Handling_editor() {
  return (
    <Container 
        backgroundColor= "rgba(26, 32, 44, 0.95)"
        p={2}
        minW={"md"}
        >
        <Box>
            <VStack spacing="4" h="96vh">
                <Navbar />
                <Divider />
                <Editor_info />
                <Attributes_editor />
            </VStack>
        </Box>
    </Container>
  )
}

export default Handling_editor
