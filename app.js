const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];


//build team
function buildTeam(){

    //create the output dir if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
  //  fs.writeFileSync(OUTPUT_DIR, render(teamMembers), "utf-8");

}

//function start(){}

function addMember(roleInfo){
    switch(roleInfo) {
        case "manager":
            strExtraField = "office number";
            break;
        case "engineer":
            strExtraField = "Github username";
            break;
        case "intern":
            strExtraField = "school";
    }
    inquirer.prompt ([
        { 
            type: "input",
            name: "member_name",
            message:  `What is your ${roleInfo}'s name?`
        },
        { 
            type: "input",
            name: "member_id",
            message:  `What is your ${roleInfo}'s id?`
        },
        { 
            type: "input",
            name: "member_email",
            message:  `What is your ${roleInfo}'s email?`
        },   
        { 
            type: "input",
            name: "member_extra_field",
            message:  `What is your ${roleInfo}'s ${strExtraField}?`
        },            
    ])
   .then(answers => {
    let newMember;
    switch(roleInfo) {
        case "manager":
            newMember = new Manager(answers.member_name, answers.member_id, answers.member_email, answers.member_extra_field);
            break;
        case "engineer":
            newMember = new Engineer(answers.member_name, answers.member_id, answers.member_email, answers.member_extra_field);
            break;
        case "intern":
            newMember = new Intern(answers.member_name, answers.member_id, answers.member_email, answers.member_extra_field);
    }
    teamMembers.push(newMember);
    createTeam();
    })
}
  // createTeam()
function createTeam() {
    inquirer.prompt ([
    {
        type: "list",
        message: `Which type of team member would you like to add?`,
        choices: ["manager", "engineer", "intern", "I don't want to add any more team members"],
        name: "member_new_role",
    },  
    ])
    .then(answers => {
        if (answers.member_new_role==="I don't want to add any more team members") {
            buildTeam();
        }
        else {
            addMember(answers.member_new_role);
        }
        
    })
}

  // type list of options to call for team members

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



addMember("manager");

//addMember(("manager") => console.log('huzzah done!'));
