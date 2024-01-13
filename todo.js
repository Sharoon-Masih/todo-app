import inquirer from "inquirer";
import chalk from "chalk";
// import chalkanimation from "chalk-animation"
// const animation=chalkanimation.rainbow("Welcome to todo list app",3) //chalkanimation ki library iss lia use ki hai taka text animation ma work kray.
// setTimeout(()=>{
// animation.stop()
// },3000)
//todo app highlights
let isDone = false;
let anslist;
let tasklist = ["todo1", "todo2", "todo3", "todo4"];
let ans;
let remove;
let completed;
let newtask = [];
let newtask2 = [];
let isRemove = false;
console.log(chalk.bgWhiteBright.redBright.bold("\t\t\tWelcome to todo list app"));
do {
    anslist = await inquirer.prompt({
        type: "rawlist",
        name: "task",
        message: "choose the task you want to do:",
        choices: [`${chalk.blue.italic.bold("Add new todo")}`, `${chalk.blue.italic.bold("show all todo list")}`, `${chalk.blue.italic.bold("Remove todo")}`, `${chalk.blue.italic.bold("select todo to mark as done")}`, `${chalk.blue.italic.bold("exit")}`]
    });
    // [`${chalk.blue.italic.bold("todo1")}`,`${chalk.blue.italic.bold("todo2")}`,`${chalk.blue.italic.bold("todo3")}`,`${chalk.blue.italic.bold("todo4")}`,`${chalk.blue.italic.bold("exit")}`]
    if (anslist.task === `${chalk.blue.italic.bold("Remove todo")}`) {
        remove = await inquirer.prompt({
            type: "input",
            name: "toRemove",
            message: "Enter task you want to delete:"
        });
        isRemove = true;
        if (!isDone) {
            let removed = tasklist.find((val) => val === remove.toRemove); //yaha find ka method iss lia use kia hai bcuz find ka method puray array ma jo be element pehla match hogya user ka answer say wo return hojayega in string form.bcuz agr filter use krtay hain toh wo array return krta hai iss lia find use kia hai bcuz indexof ma hum string pss krskty hain array nahi.
            console.log(chalk.yellow.italic.bold("task removed:"), removed);
            if (typeof removed === "string") { //here we do narrowing bcuz 'removed' have union type string and undefined so thats why ab indexof() ka method toh string value hi legana so iss lia agr removed ki type string hogi toh agy proceed hoga else "undefined". 
                let index = tasklist.indexOf(removed);
                tasklist.splice(index, index++); //yaha splice ka 2nd parameter ma one ka increment iss lia kia hai bcuz splice ka jo pehla parameter hota hai wo index number accept krta hai element ka and second parameter array ma jo element ki position hoti hai wo number ata hai toh its a trick that always element ka 'position' number 'index' number sa  1 time zeada hi hota hai.
            }
            else {
                console.log("Undefined");
            }
        }
        else if (isDone) {
            let removed = newtask2.find((val) => val === remove.toRemove); //yaha find ka method iss lia use kia hai bcuz find ka method puray array ma jo be element pehla match hogya user ka answer say wo return hojayega in string form.bcuz agr filter use krtay hain toh wo array return krta hai iss lia find use kia hai bcuz indexof ma hum string pss krskty hain array nahi.
            console.log(chalk.yellow.italic.bold("task removed:"), removed);
            if (typeof removed === "string") { //here we do narrowing bcuz 'removed' have union type string and undefined so thats why ab indexof() ka method toh string value hi legana so iss lia agr removed ki type string hogi toh agy proceed hoga else "undefined". 
                let index = newtask2.indexOf(removed);
                newtask2.splice(index, index++); //yaha splice ka 2nd parameter ma one ka increment iss lia kia hai bcuz splice ka jo pehla parameter hota hai wo index number accept krta hai element ka and second parameter array ma jo element ki position hoti hai wo number ata hai toh its a trick that always element ka 'position' number 'index' number sa  1 time zeada hi hota hai.
            }
            else {
                console.log("Undefined");
            }
        }
    }
    else if (anslist.task === `${chalk.blue.italic.bold("Add new todo")}`) {
        ans = await inquirer.prompt({
            type: "input",
            name: "newTodo",
            message: "Enter new Todo:",
        });
        {
            tasklist.push(ans.newTodo);
            newtask2.push(ans.newTodo);
        }
    }
    else if (anslist.task === `${chalk.blue.italic.bold("select todo to mark as done")}`) {
        completed = await inquirer.prompt({
            type: "checkbox",
            name: "done",
            choices: tasklist,
        });
        //   if (isRemove) {
        //         let removeAdd: string | undefined = tasklist.find((val) => val === ans.newTodo)
        //         if (typeof removeAdd === "string") {
        //             // let index1: number = tasklist.indexOf(removeAdd)
        //             // tasklist.splice(index1, index1++)
        //             let index2: number = newtask2.indexOf(removeAdd)
        //             newtask2.splice(index2, index2++)
        //         }
        //     } 
        let Remove = completed.done;
        console.log(Remove);
        let i;
        for (i = 0; i < Remove.length; i++) {
            newtask.push(Remove[i] + " (done)");
            // tasklist.splice(i,i+1)
            tasklist.shift();
            console.log(i);
        }
        newtask2 = newtask.concat(tasklist);
        isDone = true;
    }
    else if (anslist.task === `${chalk.blue.italic.bold("show all todo list")}`) {
        if (isDone) {
            newtask2.forEach((val) => console.log(val));
        }
        //     else
        //     {
        //         let Newre:string|undefined=newtask2.find((val)=> val === remove.toRemove)
        //        if(typeof Newre==="string"){
        //         let newIndex:number=newtask2.indexOf(Newre)
        //        newtask2.splice(newIndex,newIndex++)
        //     }
        //     else
        //     {
        //         console.log("Undefined");
        //     }
        //     }
        // }
        else {
            tasklist.forEach((val) => console.log(val));
        }
    }
} while (anslist.task !== `${chalk.blue.italic.bold("exit")}`);
