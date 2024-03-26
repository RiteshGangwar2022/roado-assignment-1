/*this interface defines the structure of user data */
interface UserData {
    user_id: string;
    logged_in: Date;
    logged_out: Date;
    devices: { device_id: string; lastSeenAt: Date }[];
}

//sample user data
const usersData: UserData[] = [
    {
        user_id: "1",
        logged_in: new Date("2024-01-08"),
        logged_out: new Date("2024-07-08"),
        devices: [
            { device_id: "device1", lastSeenAt: new Date("2024-01-05") },
            { device_id: "device2", lastSeenAt: new Date("2024-01-07") }
        ]
    },
    {
        user_id: "2",
        logged_in: new Date("2024-02-10"),
        logged_out: new Date("2024-06-20"),
        devices: [
            { device_id: "device3", lastSeenAt: new Date("2024-02-10") },
            { device_id: "device4", lastSeenAt: new Date("2024-02-12") }
        ]
    },
    {
        user_id: "3",
        logged_in: new Date("2024-03-15"),
        logged_out: new Date("2024-06-30"),
        devices: [
            { device_id: "device5", lastSeenAt: new Date("2024-03-15") },
            { device_id: "device6", lastSeenAt: new Date("2024-03-18") }
        ]
    },
];




/*this helper takes  array of user data as input and return two objects monthly_active_users and monthly_logged_in_users */

function helper_fn(usersData: UserData[]): [Record<number, number>, Record<number, number>] {


    const month_active_users: Record<number, number> = {};
    const month_logged_users: Record<number, number> = {};

    usersData.forEach(user => {

        const login_month = user.logged_in.getMonth() + 1;

        const logout_month = new Date(Math.min(user.logged_out.getTime(), user.logged_in.getTime() + (6 * 30 * 24 * 60 * 60 * 1000))).getMonth() + 1;//getting month from the given user timestamp

        for (let month = login_month; month <= logout_month; month++) {
            if (!month_active_users[month]) {
                month_active_users[month] = 0;
                month_logged_users[month] = 0;
            }

            month_logged_users[month]++;

            if (month === login_month) {
                month_active_users[month]++;
            }
        }
    });
    
    /*return two objects*/
    return [month_logged_users, month_active_users];
}



const [month_logged_users, month_active_users] = helper_fn(usersData);



Object.entries(month_logged_users).forEach(([month, loggedInUsers]) => {

    const activeUsers = month_active_users[parseInt(month)] || 0;//converting to integer

    console.log(`In month ${month}:`);
    console.log(`Logged in users: ${loggedInUsers}`);
    console.log(`Active users: ${activeUsers}`);
});