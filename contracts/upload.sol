pragma solidity >=0.4.25;
pragma experimental ABIEncoderV2; 

contract CheckMusic {
    Music[] public music;
    
    struct Music{
        string _hashMusic;
    }
    
    function setMusic(string memory _hashMusic) public {
        music.push(Music(_hashMusic));
    }
    
    function getMusic() public view returns (Music[] memory){
        return music;
    }
}