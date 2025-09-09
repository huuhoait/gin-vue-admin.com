# Enable TypeScript

When creating .vue files, add the `lang="ts"` attribute to all `<script>` tags inside .vue, for example: `<script lang="ts">` `<script lang="ts" setup>` to enable ts mode in the current vue component. You can freely use the ts syntax you need.

If your other components don't need ts, you can continue using js for development with the original tags without lang=ts. The project supports different components using different languages for synchronous development. You can make the best choice according to your preferences and needs.

<img src="/web/ts.jpg" />