import { ValidateErrorJson } from "../errors";
import { Body, Get, Post, Route, Response, SuccessResponse, Controller} from "tsoa"

interface PingResponse {
    message: string
    timestamp: Date
}

interface PingMessage {
    /**
     * @minLength 3 string must be longer than 3 letters
     */
    say: string;
}

@Route('heartbeat')
export class PingController extends Controller {
    @Get('/')
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "Still alive",
            timestamp: new Date()
        }
    }
    @Response<ValidateErrorJson>(422, "Validation failed")
    @SuccessResponse("201", "Created")
    @Post('/')
    public async reply(@Body() message: PingMessage): Promise<PingResponse> {
        this.setStatus(201)
        return {
            message: message.say,
            timestamp: new Date()
        }
    }
}