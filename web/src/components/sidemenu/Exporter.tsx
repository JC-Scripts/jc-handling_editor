import { Container, Textarea } from '@chakra-ui/react'
import { useHandlingStore } from '../../store/handlingStore'
import { useEffect } from 'react';
import { useState } from 'react';


function Exporter() {

    const {handlings, updateHandlingStore}  = useHandlingStore()
    const [xmlContent, setXmlContent] = useState<string>("")

    
    useEffect(() => {

        const handlingAttributes = handlings.map(handling => (
            `    < ${handling.name} value="${handling.value}"/>`   
           )).join("\n").trim();

        const xmlContentTest = `<HandlingData>
  <Item type="CHandlingData">
    ${handlingAttributes}
  </Item>
</HandlingData>
`;
        setXmlContent(xmlContentTest)
    }, [handlings, updateHandlingStore])

    return (
        <Container p={1} border={"solid"} borderWidth={2} borderRadius={2} borderColor={"gray.600"} scrollBehavior={"smooth"}
            bg={"gray.800"}> 
        <Textarea
            color={"gray.200"}
            bg={"#090a0a"}
            resize={"none"}
            border={"none"}
            value={xmlContent}
            isReadOnly
            whiteSpace={"pre"}
            fontFamily={"monospace"}
            _focus={{ outline: 'none' }}
            p={2}
            h={"86vh"}
            sx={{
                /* Hide scrollbar */
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        />
        </Container>
    )
}

export default Exporter
