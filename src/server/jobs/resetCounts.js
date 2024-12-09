import cron from "node-cron";
import { Profile } from "../models/profile.js";

// A cron job allows you to execute something on a schedule or a task to be executed sometime in the future.
cron.schedule("0 0 * * *", async () => {
  try {
    // set acceptDailyCount, and swipeDailyCount in Profile as 0 every midnight
    const result = await Profile.updateMany({}, { $set: { acceptDailyCount: 0, swipeDailyCount: 0 } })
  } catch (error) {
    console.error('Error resetting count: ', error);
  }
});

export default {};
