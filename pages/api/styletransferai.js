
import SnetSDK, { DefaultPaymentStrategy } from "snet-sdk";
import service from "../../public/client_libraries/snet/style-transfer/nodejs/style_transfer_grpc_pb";
import messages from "../../public/client_libraries/snet/style-transfer/nodejs/style_transfer_pb.js";

export default (req, res) => {
    console.log("request", req.body);
  const {
    privateKey,
    networkId,
    web3Provider,
    content,
    style,
    contentSize = 640,
    styleSize = 640,
    preserveColor = false,
    alpha = 1.0,
    crop = false,
    saveExt = "",
    tokenToMakeFreeCall,
    tokenExpirationBlock,
    email,
  } = req.body;
  console.log("received request");
  const config = {
    web3Provider,
    privateKey,
    signerPrivateKey: privateKey,
    networkId,
    ipfsEndpoint: "http://ipfs.singularitynet.io:80",
    defaultGasPrice: "4700000",
    defaultGasLimit: "210000",
  };
  const sdk = new SnetSDK(config);
  console.log("initialized sdk");
  const orgId = "snet";
  const serviceId = "style-transfer";
  const groupName = "default_group";
  const paymentStrategy = new DefaultPaymentStrategy(2);
  const serviceClientOptions = {
    tokenToMakeFreeCall: tokenToMakeFreeCall.toUpperCase(),
    tokenExpirationBlock,
    email,
    disableBlockchainOperations: false,
    concurrency: true,
  };

  console.log("updated config values");

  let outputImageData;
  try {
    const serviceClient = await sdk.createServiceClient(
      orgId,
      serviceId,
      service.StyleTransferClient,
      groupName,
      paymentStrategy,
      serviceClientOptions
    );
    console.log("created service client");
    
    const response = await new Promise((resolve, reject) => {
      const request = new messages.TransferImageStyleRequest();
      request.setContent(content);
      request.setStyle(style);
      request.setContentsize(contentSize);
      request.setStylesize(styleSize);
      request.setPreservecolor(preserveColor);
      request.setAlpha(alpha);
      request.setCrop(crop);
      request.setSaveext(saveExt);

      serviceClient.service.transfer_image_style(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("result image", result.getData());
        resolve(result);
      });
    });
    outputImageData = response.getData();
  } catch (error) {
    console.error("error", error);
  }
  const outputImage = Buffer.from(outputImageData, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': outputImage.length
  });
  res.end(outputImage)
  }