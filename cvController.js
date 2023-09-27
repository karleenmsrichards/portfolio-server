import { getCVInfo } from "./cvRepository.js";

export async function cvInfo(request, response) {
  try {
    const allDocsInfo = await getCVInfo();
    response.setHeader("Content-Type", "application/json");
    response.status(200).json(cv);
  } catch (error) {
    response.status(500).send(error);
  }
}
