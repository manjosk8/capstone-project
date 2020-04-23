import 'source-map-support/register'

import { S3Handler, S3Event } from 'aws-lambda'

import { activateUploadUrl } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
const logger = createLogger('s3')

export const handler: S3Handler = async (event: S3Event) => {
    logger.info('Processing event: ', event)

    const itemKeyRegex = /^(.*?)\.png/g
    for (const s3Record of event.Records) {
        const key = s3Record.s3.object.key;
        logger.info(`Processing S3 create object key ${key}`)
        
        //Check if processed event corresponds to the uploaded image
        const match = itemKeyRegex.exec(key);
        if (match) {
            const itemId = match[1]
            try {
                const result = await activateUploadUrl(itemId);
                if (result) {
                    logger.info(`Successfuly added ${itemId} attachmentUrl`)
                } else {
                    logger.info(`Didn't find ${itemId} in the dataabase to add attachmentUrl`)
                }
            } catch(e) {
                logger.error(`Error adding attachmentUrl for item ${itemId}`)
            }
        }
    }
}