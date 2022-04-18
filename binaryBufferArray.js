class BinaryArray {
    
    constructor(bytes = 1000) { //just set to something high
        this.bytes = bytes;
    
        this.view = new Int32Array(this.bytes);
        
        this.locater = new Int16Array(new ArrayBuffer(this.bytes * 2));
        
        this.l = 0;
    }
    
    __binaryAgent__(str) {
        let arr = str.split(" ").map(item => parseInt(item, 2)); 

        return arr.map(item => String.fromCharCode(item)).join("");
    }
    
    __convertStringToBinary__(str) {
        return str.split('').map(function (char) {
            return char.charCodeAt(0).toString(2);
        });
    }
    
    setElement(element, index) {
        let binaryArray = this.__convertStringToBinary__( JSON.stringify( element ) );
        
        this.locater[index] = this.l;
        this.locater[index + 1] = this.l += binaryArray.length;
        
        for(let i = this.l - binaryArray.length; i < this.l; i ++) {
            let binary = binaryArray[i - this.l + binaryArray.length];
            
            this.view[i] = parseInt(binary);
        }
    }
    
    static fromArray(array, bytes = 1000) {
        let binaryArray = new BinaryArray(bytes);
        
        for(let i = 0; i < array.length; i++) {
            
            binaryArray.setElement(array[i], i);
        }
        
        return binaryArray;
    }
    
    getArray() {
        let array = [];
        
        for(let index = 0; index < this.bytes; index++) {
            try {
                array.push(this.getElement(index));
            } catch(e) {
                return array;
            }
        }
    }
    
    getElement(index) {
        let start = this.locater[index],
        end = this.locater[index + 1];
        
        let fullBinary = "";
        
        for(let i = start; i < end; i++) {
            if(i < end - 1)
                fullBinary += this.view[i] + " ";
            else
                fullBinary += this.view[i];
        }
        
        return JSON.parse(this.__binaryAgent__(fullBinary));
    }
}