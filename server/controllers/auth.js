

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from yaay',
    });

};

export const preRegister = async(req, res)=>{
    //create jwt with email and password then email as clickable link
    //only when user clicks on the email link registration completes
    
    try{
        //
        console.log(req.body);
    } catch(err){
        console.log(err)
        return res.json({error:"Something went wrong. Try AGAIN."});

    }
};