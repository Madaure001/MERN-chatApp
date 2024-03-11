export function handleErrorInput ({ fullName, username, password, confirmPassword, gender}) {
    
    if (!fullName || !username || !password || !confirmPassword ) {
        console.log({ error: "Please fill in all fields" });        
        return false;
    };
    if (password.length < 8) {          //check password length
        console.log({ error: "Password must be at least 8 characters" });
        return false;
    };
    if (password !== confirmPassword) { //check if passwords match
        console.log({ error: "Passwords do not match" });
        return false;
    };    
    if (username.length < 6) {          //check username length
        console.log({ error: "username must be at least 6 characters" });
        return false;
    };
    const pattern = /^[a-zA-Z0-9]+$/;
    const patternName = /^[a-zA-Z ]+$/;

    if (!pattern.test(username)) {      //check username for special characters
        console.log({ error: "Username cannot have special characters" });        
        return false;
    };
    if (!patternName.test(fullName)) {  //check full names for special characters
        console.log({ error: "Full names cannot have special characters" });        
        return false;
    };
    if (fullName.length < 7) {          //check full name for characters length
       console.log ({ error: "Full names too short" }); 
        return false;
    };
   
    return true;
 
}