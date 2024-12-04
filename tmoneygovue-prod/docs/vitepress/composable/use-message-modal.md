---
outline: deep
---
# useMessageModal

메세지 modal. 성공/실패/알림 과 같이 메세지로 단순한 modal을 사용자에서 노출할때 사용. 별도로 templite 하위에 commponent 선언 없이 사용.

## 제공 함수
함수로는 성공/실패/알림 이 상태 구분되어 있으나 현재 디자인이 상태에 따른 구분이 없어서 명확히 구분되는 케이스가 아니면 createNotificationModal 을 사용
```typescript
// sucesss modal by title and content
createSuccessModal(title: string, content: string);
// sucesss modal by option
createSuccessModalAndOption(options: uuModalProps, content: string);

// error modal by title and content
createErrorModal(title: string, content: string);
// error modal by option
createErrorModalAndOption(options: uuModalProps, content: string);

// notification modal by title and content
createNotificationModal(title: string, content: string);
// notification modal by option
createNotificationModalAndOption(options: uuModalProps, content: string);
```
## 예제

```typescript
import { useMessageModal } from '@/composables/useMessageModal';

const { createNotificationModal } = useMessageModal();
createNotificationModal('제목', '내용');
// ex. createNotificationModal(t('system.api.errorMessage'), errMsg || t('system.api.networkException'));

```