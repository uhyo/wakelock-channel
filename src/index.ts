import { receiverPage } from './receiver';
import { senderPage } from './sender';

if (/receiver/.test(document.title)) {
  receiverPage();
} else if (/sender/.test(document.title)) {
  senderPage();
}
