import { Controller, Post, Get } from "@overnightjs/core";
import { Catch } from "../error/ErrorDeco";
import { Request, Response } from "express";
import { Queue } from "./Queue";
import { OK, NOT_FOUND, BAD_REQUEST } from "http-status-codes";
import { HttpError } from "../error/HttpError";

@Controller("")
export class QueueController {

    /**
     * @swagger
     * /push:
     *  post:
     *      tags:
     *          - queue
     *      parameters:
     *          - in: body
     *            name: args
     *            schema:
     *              type: object
     *              properties:
     *                  name:
     *                      type: string
     *                  payload:
     *                      type: object
     *      responses:
     *          200:
     *              description: ok
     */
    @Post("push")
    @Catch
    public async push(req: Request, res: Response): Promise<void> {
        await Queue.push(req.body);
        res.status(OK).json({ok: true});
    }

    /**
     * @swagger
     * /npush:
     *  post:
     *      tags:
     *          - queue
     *      parameters:
     *          - in: body
     *            name: args
     *            schema:
     *              type: object
     *              properties:
     *                  name:
     *                      type: string
     *                  payload:
     *                      type: array
     *                      items:
     *                          type: object
     *      responses:
     *          200:
     *              description: ok
     */
    @Post("npush")
    @Catch
    public async npush(req: Request, res: Response): Promise<void> {
        await Queue.npush(req.body);
        res.status(OK).json({ok: true});
    }

    /**
     * @swagger
     * /pop/{name}:
     *  get:
     *      tags:
     *          - queue
     *      parameters:
     *          - in: path
     *            name: name
     *            type: string
     *      responses:
     *          200:
     *              description: ok
     *              schema:
     *                  type: object
     *          404:
     *              description: Queue empty
     */
    @Get("pop/:name")
    @Catch
    public async pop(req: Request, res: Response): Promise<void> {
        const {name} = req.params;
        const payload = await Queue.pop(name);
        if (payload) {
            res.status(OK).json(payload);
        } else {
            res.status(NOT_FOUND).send();
        }
    }

    /**
     * @swagger
     * /pop/{name}/{number}:
     *  get:
     *      tags:
     *          - queue
     *      parameters:
     *          - in: path
     *            name: name
     *            type: string
     *          - in: path
     *            name: number
     *            type: number
     *      responses:
     *          200:
     *              description: ok
     *              schema:
     *                  type: object
     *                  properties:
     *                      payload:
     *                          type: array
     *                          items: 
     *                              type: object
     *          404:
     *              description: Queue empty
     */
    @Get("pop/:name/:number")
    @Catch
    public async npop(req: Request, res: Response): Promise<void> {
        const {name, number} = req.params;
        if (!number || isNaN(number as any)) {
            throw new HttpError("Number is not valid", BAD_REQUEST);
        }
        const nNumber = Number(number);
        const payload = await Queue.npop(name, nNumber);
        if (payload) {
            res.status(OK).json({payload});
        } else {
            res.status(NOT_FOUND).send();
        }
    }

}