import { O_NONBLOCK } from "constants";
import { copyFileSync } from "fs";

let ss=process.argv.slice(2)
const fs = require('fs')
let symbol=0
let s = fs.readFileSync(ss[0],'utf8');
interface Expresion{
    id: string;
    op: string;
    left:Value;
    right:Value;
    line:number;
    symbol:string;
    type:string

}
interface Value{
    id: string;
    type: string;
    title: string;
    

}
 interface DeclarationElement {
    id: string;
    type: string;
    title: string;
    value:Value|Expresion;
    line: number;
}
 interface FunctionDeclaration{
     id:string;
     title:string
     parameters:DeclarationElement[]
     return_type:string
     statements:StatementDec[]

 }

 interface StatementDec {
    id: string;
    elements: DeclarationElement[];
    line: number;
}

 interface Root {
    id: string;
    statements: any;
    line: number;
}
interface ExpresionAST{
    id: string;
    op: string;
    left:ValueAST;
    right:ValueAST;
    symbol:number

}
interface ValueAST{
    id: string;
    type: string;
    title: string;
    symbol:number

}
interface DeclarationElementAST {
    id: string;
    type: string;
    title: string;
    value:any;
    line: number;
}
interface StatementAST {
    id: string;
    elements: DeclarationElementAST[];
    line: number;
    symbol:number
    
}

 interface RootAST {
    id: string;
    statements: any;
    line: number;
    symbol:number
}
let st:Root=JSON.parse(s)
let ast:RootAST=JSON.parse(s)
interface symbol_table_variables{
    type:string,
    value:any,
    line:any
}
interface symbol_function_table{
    type:string,
    parameters:any,
    line:number,
    symbol:number;
}
interface symbol_types_table{
    type:string|undefined
    properties:any[]|undefined
    line:any
    element_type:any
    from:any
    to:any
}
let functions:{ [variable: string]: symbol_function_table}={}
let types:{[variable:string]:symbol_types_table}={}
function addClassType(name:string,type:string,properties:any){
    types[name]={
        type:type,
        properties:properties,
        line:undefined,
        element_type:undefined,
        from:undefined,
        to:undefined,

    }

}
function addArrayType(name:string,element_type:string,from:string,to:string,line:number){
    types[name]={
        type:"array",
        properties:undefined,
        line:line, 
        element_type:element_type,
        from:from,
        to:to,
        
    }

}
let variables:{ [variable: string]: symbol_table_variables}={}
function addVariable(name:string,type:string,value:any,line:any){
    variables[name]={
        type:type,
        value:value,
        line:line
    }
   
    let vk=new vars(name,symbol,type)
    v.push(vk) 
}
function addFunction(name:string,type:string,parameters:any,line:number,symbol:number){
    functions[name]={
        type:type,
        parameters:parameters,
        line:line,
        symbol:symbol
    }
    for(let i=0;i<parameters.length;i++){
        let vk=new vars(parameters[i].name,parameters[i].symbol,parameters[i].type)
       v.push(vk)
    }
    let vf=new vars(name,symbol,type)
    f.push(vf)
    
}
class vars{
    name:string
    symbol:number
    type:string|undefined
    constructor(name:string,symbol:number,type:string|undefined){
        this.name=name
        this.symbol=symbol
        this.type=type
    }
}
let v:vars[]=[]
let f:vars[]=[]
let functionField
function addFunctionField(variables:any,functions:any,types:any,type:string,f:string,ret:string){
    if (variables==undefined)
    variables={}
    if(functions==undefined)
    functions={}
    if(types==undefined)
    types={}
    functionField={
      "variables": variables,
      "functions": functions,
      "types":types,
      "parent": 0,
      "type": type,
      "function": f,
      "return_type": ret
    }

}

for(let i=0;i<st.statements.length;i++){
    
    if(st.statements[i].id=="Declaration")
    for(let j=0;j<st.statements[i].elements.length;j++){
        if(st.statements[i].elements[j].value!=undefined){
            st.statements[i].elements[j].value.symbol=0
            
            if(st.statements[i].elements[j].value.id=="Expression"){
                if(st.statements[i].elements[j].value?.left?.id=="Value")
                st.statements[i].elements[j].value.left.symbol=0
                else{
                    if(st.statements[i].elements[j].value?.left?.left?.id=="Value")
                    st.statements[i].elements[j].value.left.left.symbol=0
                    if(st.statements[i].elements[j].value?.left?.left?.right?.id=="Value")
                    st.statements[i].elements[j].value.left.left.right.symbol=0
                st.statements[i].elements[j]. value.left.symbol=0
                st.statements[i].elements[j].value.left.type=st.statements[i].elements[j].value.left.type
                }
                if(st.statements[i].elements[j].value?.right?.id=="Value")
                st.statements[i].elements[j].value.right.symbol=0
                else{
                    st.statements[i].elements[j]. value.right.symbol=0
                    if(st.statements[i].elements[j].value?.right?.left?.id=="Value"){
                    st.statements[i].elements[j].value.right.left.symbol=0
                    st.statements[i].elements[j].value.right.type=st.statements[i].elements[j].value.right.left.type
                    }
                    if(st.statements[i].elements[j].value?.right?.right?.id=="Value"){
                    st.statements[i].elements[j].value.right.right.symbol=0
                    st.statements[i].elements[j].value.right.type=st.statements[i].elements[j].value.right.right.type
                    }
                    if(st.statements[i].elements[j].value?.right?.left?.right?.id=="Value"){
                    st.statements[i].elements[j].value.right.left.right.symbol=0
                    st.statements[i].elements[j].value.right.type= st.statements[i].elements[j].value.right.left.right.type
                    }
                   
                    
                
        
                }
                st.statements[i].elements[j]. value.symbol=0
                st.statements[i].elements[j].value.type="integer"
            }
            }
        addVariable(st.statements[i].elements[j].title,st.statements[i].elements[j].type,st.statements[i].elements[j].value,st.statements[i].elements[j].line)
    }
    else
    if(st.statements[i].id=="FunctionDefinition"){
      if(st.statements[i].parameters!=[])
      symbol=symbol+1
      for(let j=0;j<st.statements[i].parameters.length;j++)
      st.statements[i].parameters[j].symbol=symbol
      
      addFunction(st.statements[i].title,st.statements[i].return_type,st.statements[i].parameters,st.statements[i].line,1)
      addFunctionField(undefined,undefined,undefined,"function",st.statements[i].title,st.statements[i].return_type)
    }
    else
    if(st.statements[i].id=="ClassDefinition"){
    for(let j=0;j<st.statements[i].properties.length;j++)    
    if(st.statements[i].properties[j].value!=undefined){
    st.statements[i].properties[j].value.symbol=0
    }
    addClassType(st.statements[i].title,"struct",st.statements[i].properties)
    }
    else
    if(st.statements[i].id=="Array"){
      addArrayType(st.statements[i].title,st.statements[i].element_type,st.statements[i].from,st.statements[i].to,st.statements[i].line)
    }
}   
let symbol_table
if(functionField!=null)
symbol_table=[{
     variables,
      functions,
      types,
     "type":"Statements"
},
  functionField
]
else
symbol_table=[{
    variables,
     functions,
     types,
    "type":"Statements"
},
]
let error_list:JSON[]=[]



function addError(type:string,line:number,elements:any,text:string){

     let e:any={
       "type":type,
       "line":line,
       "elements":elements,
       "text":text

      }
      e=<JSON>(e)
      error_list.push(e)

}

ast.symbol=0
let m=""
for(let i=0;i<ast.statements.length;i++){
    
     if(ast.statements[i].id=="Array"){
      if(parseInt(ast.statements[i].from)>parseInt(ast.statements[i].to)){
       m="Array index lower value (",ast.statements[i].from,") must be smaller that the upper value (",ast.statements[i].to,")"
       addError("ARRAY_INDEX_VALUE",ast.statements[i].line,{"array":ast.statements[i].title,"low_index":ast.statements[i].from,"high_index":ast.statements[i].to},m)
     }
    }
     
    ast.statements[i].symbol=0
    if(ast.statements[i].id=='Declaration'){
        
        for(let j=0;j<ast.statements[i].elements.length;j++){ 
            
        if(ast.statements[i].elements[j].value!=undefined){
            ast.statements[i].elements[j].value.symbol=0
            
    }
    
    if(ast.statements[i].elements[j].value?.id=="Expression"){
        
        if(ast.statements[i].elements[j].value?.left?.id=="Value"){
        ast.statements[i].elements[j].value.left.symbol=0
        ast.statements[i].elements[j].value.type=ast.statements[i].elements[j].value.left.type
        }
        else{
          
            if(ast.statements[i].elements[j].value?.left?.left?.id=="Value"){
            ast.statements[i].elements[j].value.left.left.symbol=0
            ast.statements[i].elements[j].value.type=ast.statements[i].elements[j].value.left.left.type
            }
            if(ast.statements[i].elements[j].value?.left?.left?.right?.id=="Value"){
           ast.statements[i].elements[j].value.left.left.right.symbol=0
           ast.statements[i].elements[j].value.type=ast.statements[i].elements[j].value.left.right.type
            }
        ast.statements[i].elements[j]. value.left.symbol=0
        ast.statements[i].elements[j].value.left.type=st.statements[i].elements[j].value.left.type
       
        }
        if(ast.statements[i].elements[j].value?.right?.id=="Value")
        ast.statements[i].elements[j].value.right.symbol=0
        else{
            ast.statements[i].elements[j]. value.right.symbol=0
            if(ast.statements[i].elements[j].value?.right?.left?.id=="Value"){
            ast.statements[i].elements[j].value.right.left.symbol=0
            ast.statements[i].elements[j].value.right.type=st.statements[i].elements[j].value.right.left.type
            }
            if(ast.statements[i].elements[j].value?.right?.right?.id=="Value"){
            ast.statements[i].elements[j].value.right.right.symbol=0
            ast.statements[i].elements[j].value.right.type=st.statements[i].elements[j].value.right.right.type
            }
            if(ast.statements[i].elements[j].value?.right?.left?.right?.id=="Value"){
            ast.statements[i].elements[j].value.right.left.right.symbol=0
            ast.statements[i].elements[j].value.right.type= st.statements[i].elements[j].value.right.left.right.type
            }
           
            
        

        }
        ast.statements[i].elements[j]. value.symbol=0
      
    }


     }
    }
    else
    if(ast.statements[i].id=="Expression"){
     
        
       
        if(ast.statements[i].left.id=="Value"){
     
        ast.statements[i].left.symbol=0
        ast.statements[i].type= ast.statements[i].left.type
        ast.statements[i].type=ast.statements[i].left.type
        }
        else{
            ast.statements[i].left.symbol=0
        if(ast.statements[i].left?.left?.id=="Value"){
        ast.statements[i].left.left.symbol=0
        ast.statements[i].left.left.type=ast.statements[i].left.left.type
        ast.statements[i].type=ast.statements[i].left.left.type
        }
        else{
            if(ast.statements[i].left?.left?.left?.id=="Value")
            ast.statements[i].left.left.left.symbol=0
            if(ast.statements[i].left?.left?.left?.right?.id=="Value")
           ast.statements[i].left.left.left.right.symbol=0
           
       
        }
    }
    if(ast.statements[i].left?.right?.id=="Value"){
        ast.statements[i].left.right.symbol=0
        ast.statements[i].left.right.type=ast.statements[i].left.right.type
        
        }
        else{
            if(ast.statements[i].left?.right?.left?.id=="Value")
            ast.statements[i].left.right.left.symbol=0
            if(ast.statements[i].left?.rigth?.left?.id=="Value")
           ast.statements[i].left.right.left.symbol=0
           
       
        }
    if(ast.statements[i].right.id=="Value"){
    ast.statements[i].right.symbol=0
   
    }
    else{
        if(ast.statements[i].right?.right?.id=="Value"){
        ast.statements[i].right.right.symbol=0
        ast.statements[i].type= ast.statements[i].right.right.type
        }
        else{

           
            if(ast.statements[i].right?.right?.left?.id=="Value"){
            ast.statements[i].right.right.left.symbol=0
            ast.statements[i].right.right.type=ast.statements[i].right.right.left.type
            ast.statements[i].type=ast.statements[i].right.right.left.type
            }
            if(ast.statements[i].right?.right?.right?.id=="Value"){
            ast.statements[i].right.right.right.symbol=0
            ast.statements[i].right.right.type=st.statements[i].right.right.right.type
            }
            if(ast.statements[i].right?.right?.left?.right?.id=="Value"){
            ast.statements[i].right.right.left.right.symbol=0
            ast.statements[i].right.right.type= ast.statements[i].right.right.left.right.type
            ast.statements[i].type=ast.statements[i].right.right.left.right.type
            }
        }
        if(ast.statements[i].rigth?.left?.id=="Value"){
            ast.statements[i].right.left.symbol=0
            ast.statements[i].right.left.type=ast.statements[i].left.right.type
            ast.statements[i].type=ast.statements[i].left.right.type
            }
            else{
                if(ast.statements[i].right?.left?.left?.id=="Value"){
                ast.statements[i].right.left.left.symbol=0
                ast.statements[i].type=ast.statements[i].right.left.left.type
                }
                if(ast.statements[i].right?.left?.left?.id=="Value"){
               ast.statements[i].right.left.left.symbol=0
               ast.statements[i].type=ast.statements[i].right.left.left.type
                }
           
            }
           
        }
        if(ast.statements[i].left.id=="FunctionCall"){
            ast.statements[i].left.symbol=0
            ast.statements[i].left.type= findFunctionType(ast.statements[i].left.function_name)
          ast.statements[i].type= findFunctionType(ast.statements[i].left.function_name)
        }if(ast.statements[i].right.id=="FunctionCall"){
            ast.statements[i].right.symbol=0
            ast.statements[i].right.type= findFunctionType(ast.statements[i].right.function_name)           
          ast.statements[i].type= findFunctionType(ast.statements[i].right.function_name)
          if(ast.statements[i].type==undefined)
          ast.statements[i].type=""
        }
    }

        
    
    if(ast.statements[i].id=='ClassDefinition'){
        for(let j=0;j<ast.statements[i].properties.length;j++)    
        if(ast.statements[i].properties[j].value!=undefined){
        ast.statements[i].properties[j].value.symbol=0
    }
     }
     if(ast.statements[i].id=="FunctionDefinition"){
        
        if(ast.statements[i].parameters!=[]){
        ast.statements[i].symbol=1
      
        for(let j=0;j<ast.statements[i].parameters.length;j++){
        
        ast.statements[i].parameters[j].symbol=findVariable(ast.statements[i].parameters[j].name)
        }
        }
        if(ast.statements[i].statements!=[]){

            for(let j=0;j<ast.statements[i].statements.length;j++){
            ast.statements[i].statements[j].symbol=1
            if(ast.statements[i].statements[j].id=="Assign"){
                
                if(ast.statements[i].statements[j].to.id=="Variable"){
                    
                    ast.statements[i].statements[j].to.symbol=findVariable( ast.statements[i].statements[j].to.title)
                    ast.statements[i].statements[j].to.type=findVariableType( ast.statements[i].statements[j].to.title)
                    
                }
                else
                ast.statements[i].statements[j].to.symbol=1
                if(ast.statements[i].statements[j].from.id=="Variable"){
                   
                   ast.statements[i].statements[j].from.symbol=findVariable( ast.statements[i].statements[j].to.title)
                   ast.statements[i].statements[j].from.type=findVariableType( ast.statements[i].statements[j].to.title)
               }
               else
               ast.statements[i].statements[j].from.symbol=1
                
            }
            }
        }
     }
     if(ast.statements[i].id=="FunctionCall"){
       
       ast.statements[i].type=ast.statements[i].parameters[0].value.type
     }
     if(ast.statements[i].id=="Assign"){
         
         if(ast.statements[i].to.id=="Variable"){
             
             ast.statements[i].to.symbol=findVariable( ast.statements[i].to.title)
             ast.statements[i].to.type=findVariableType( ast.statements[i].to.title)
             
         }
         else
         ast.statements[i].to.symbol=0
         if(ast.statements[i].from.id=="Variable"){
            
            ast.statements[i].from.symbol=findVariable( ast.statements[i].to.title)
            ast.statements[i].from.type=findVariableType( ast.statements[i].to.title)
        }
        else
        ast.statements[i].from.symbol=0
        if(ast.statements[i].to.id=="ClassProperty"){
            if(ast.statements[i].to.object.id=="Variable"){
            ast.statements[i].to.object.type=findVariableType( ast.statements[i].to.object.title)
            ast.statements[i].to.object.symbol=findVariable( ast.statements[i].to.object.title)
            ast.statements[i].to.type=typeof(ast.statements[i].to.title)
            }
            
        }
        else if(ast.statements[i].to.id=="ArrayElement"){
            ast.statements[i].to.symbol=0
            ast.statements[i].to.index.symbol=0
            ast.statements[i].to.type=typeof(ast.statements[i].to.array)
           }
        

         
     }
     
     
}    
let ast_final={
    symbol_table,
     ast,
    error_list
}
//console.log(v)
function findVariable(name:string):number{
    
    for(let i=0;i<v.length;i++){
        
     if(v[i].name==name)
     return v[i].symbol
    }
    return -1
}
function findVariableType(name:string):string{
    
    for(let i=0;i<v.length;i++){
        
     if(v[i].name==name)
     return v[i].type!
    }
    return "-1"
}
function findFunctionType(name:string):string{
   
    for(let i=0;i<f.length;i++){
        
        if(f[i].name==name)
        return f[i].type!
       }
       return "-1"
   }

let fileInput=require('fs')
fileInput.writeFile(ss[1],JSON.stringify(ast_final, null, 4),  function(err:any) {
    if (err) {
        return console.error(err);
    }
    
});
