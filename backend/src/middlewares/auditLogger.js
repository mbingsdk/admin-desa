import { writeAudit } from "../services/audit.service.js";
export const audit = (module, action, refIdSelector = (req)=>req.params.id) => async (req,res,next)=>{
  res.on("finish", () => {
    // hanya catat jika sukses 2xx/3xx
    if (res.statusCode < 400) {
      writeAudit({
        userId: req.user?.id,
        module, action,
        refId: refIdSelector(req),
        payload: ["POST","PUT","PATCH","DELETE"].includes(req.method) ? req.body : undefined,
        ip: req.ip,
        ua: req.headers["user-agent"]
      }).catch(()=>{});
    }
  });
  next();
};
