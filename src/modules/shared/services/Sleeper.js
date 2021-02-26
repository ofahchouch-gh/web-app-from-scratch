export default class Sleeper {
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}