import type { Style } from "~/ts/type";
import { Service } from "./service";

export class StyleService extends Service {

    public async getStyles(): Promise<Style[]> {

        try {
            // fetch the styles
            const res: Style[] = await this.fetch("/api/style/style")

            // success
            if (res) return res

        } catch (error) {
            console.error("Error in getStyles:", error)
        }

        return []
    }
}