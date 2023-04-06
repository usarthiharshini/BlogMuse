import React from 'react';
import { Input ,InputGroup,InputRightElement,SearchIcon} from '@chakra-ui/react'


const Search = () => {
    return (
        <div>
           
  <InputGroup>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input type='text' placeholder='Search' />
  </InputGroup>

  
        </div>
    );
}

export default Search;
