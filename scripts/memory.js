//to do : check the comment in 19 and finish resetSettings
class ScreenSettings{

    bgImage;
    bgColor;
    classNames;
    classToApply;
    body;
    setDocument(theDocument){
        this.body = theDocument.querySelector("body");
    }
    /**
     * saves all parameters of background colors.
     * @param {is the base HTML page and is needed to throw errors and find the effective classes} theDocument 
     * @param {are the names of all the classes whose background colors want to be changed} otherClassNames 
     */
    setPreviousTextColor(theDocument , otherClassNames){
        for (className in otherClassNames){
            let tempContainer = theDocument.querySelector(className); //check that it works, because it might give only the first class and not all classes of name className
            if (tempContainer.truthy) {
                    this.bgColor.push(className.style.backgroundcolor);
                    this.classNames.push(className);           
            } else {
                theDocument.alert(`ERROR! while searching for ${tempContainer}`);
                throw "Wrong Class Name";
            }    
        }
        
    }
    //Resets the old background image, puts back the colors of background contents
    resetSettings(){
        body.style.backgroundImage = this.bgImage;
        /* restore background color */
        //--
    }
    /**
     * 
     * @param {is needed to throw exception and find} theDocument 
     */
    darkenTextBackGround(theDocument){
        for (className in classNames){
            let tempContainer = theDocument.querySelector(className);
            tempContainer.style.backgroundColor = "rgba(242,222,202,0.25)"
        }

    }

    darkenBackground( theDocument, othersToDarken){
        this.setDocument(theDocument);
        //Saves last background image to prepare for the change        
        this.bgImage = body.style.backgroundImage;
        console.log(this.bgImage); // prints the address
        //darkens background
        this.body.style.background = 'linear-gradient(rgba(25,25,0,0.5), rgba(25,25,0,0.7))'
        
        //saves all previous CSS background-information
        this.setPreviousTextColor(theDocument, othersToDarken);


        this.darkenTextBackGround(theDocument);
    }

}
