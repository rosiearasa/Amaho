import * as config from '../config.js'

const styles = {
background : "#eeeee",
padding:" 20px",
borderradius : "20px"
}

export const emailTemplate = (email, content, replyTo, subject) =>{
    return {
        Source: config.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]},//req.body.email,
            
            Message:{
                Body: {
                    Html:{
                        Charset: "UTF-8",
                        Data: `
                        <html>
                        <div style = ${styles}>
                        <h1>Welcome to Amaho Home</h1>
                        ${content}
                        <p>&copy; ${new Date().getFullYear()}</p>
                        </div>
                        </html>
                        `,
                    },
                },
                Subject:{
                    Charset:"UTF-8",
                    Data: "Welcome to Amaho"

                },
            },
     }; 
}