const users = [];

const computeBMI = ({
    weight,
    height,
    country
}) => {

    let newUser = {
        weight,

        height,

        country
    }

    const heightToFeet = height * 0.3048;
    const calculateBMI = weight / (heightToFeet ** 2);
    let hCount = calculateBMI * 0.82;
    const countries = [
        "Chad", "Sierra Leone", "Mali", "Gambia", "Uganda", "Ghana", "Senegal", "Somalia",
        "Ivory Coast", "Isreal"
    ];

    for (let i in countries) {
        if (countries[i] === country) return hCount.toFixed(1);
    }
    return calculateBMI.toFixed(1);
};

const getSelectedUser = (userId) =>
    users.find(({
        id
    }) => id === userId);


const displaySelectedUser = ({
    target
}) => {
    const user = getSelectedUser(target.value);
    const properties = Object.keys(user);

    properties.forEach(prop => {
        const span = document.querySelector(`span[data-${prop}-value]`);
        if (span) {
            span.textContent = user[prop];
        }
    })
};

const letsCalculateBMI = () => {
    const selVal = document.querySelector("select");
    const user = getSelectedUser(selVal.value);
    const bmi = computeBMI(user);
    document.querySelector("#outcome > p").innerText = bmi;
};

const powerupTheUI = () => {
    document.querySelector("select").addEventListener("change", displaySelectedUser);
    document.querySelector("#oracle").addEventListener("click", letsCalculateBMI);
};

const displayUsers = (users) => {
    users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        document.querySelector("select").appendChild(option);
    });
}

const fetchAndDisplayUsers = () => {
    users.push({
        age: 40,
        weight: 75,
        height: 6,
        country: 'Israel',
        name: 'Paul London',
        id: 'dfhb454768DghtF',
        gender: 'Male'
    });

    users.push({
        age: 27,
        weight: 62,
        height: 6.2,
        country: 'Nigeria',
        name: 'Joshua David',
        id: 'johndoe10',
        gender: 'Male'
    });

    displayUsers(users);

    const api = "https://randomapi.com/api/y1lfp11q?key=LEIX-GF3O-AG7I-6J84";
    fetch(api)
        .then(response => response.json())
        .then(({
            results
        }) => {
            const [user] = results;
            users.push(user);
            displayUsers([user]);
            console.log("user", user);
        })
        .catch(error => console.log(error));
};

const startApp = () => {
    powerupTheUI();
    fetchAndDisplayUsers();
};

startApp();