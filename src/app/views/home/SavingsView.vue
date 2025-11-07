<script setup lang="ts">
  import TileOffer from '@/app/components/TileOffer.vue'
  import { PiggyBank, Gem, Trophy } from 'lucide-vue-next'
  import OfferingLayout from '@/app/layouts/OfferingLayout.vue'
</script>

<template>
  <OfferingLayout title="Savings solutions" subtitle="Find the right savings account to help you grow your money">
    <TileOffer
      title="Free savings"
      description="An easy way to save for your future"
      :icon="PiggyBank"
      ctaLink="/openaccount"
      :features="['Earns interest', '$5 monthly service charge', 'No withdrawal fee']">
      Open An Account
    </TileOffer>
    <TileOffer
      title="Premium savings"
      description="Enjoy extra savings with higher rates"
      :icon="Gem"
      ctaLink="/openaccount"
      :features="['Earns interest', 'No monthly service charge', 'No withdrawal fee', 'No minimum account balance']">
      Open An Account
    </TileOffer>
    <TileOffer
      title="Ultimate savings"
      description="Earn more with a high-yield account"
      :icon="Trophy"
      ctaLink="/openaccount"
      :features="[
        'Earns interest',
        'No monthly service charge',
        'No withdrawal fee',
        'No minimum account balance',
        '0.10% increase with a GitLab credit card'
      ]">
      Open An Account
    </TileOffer>
  </OfferingLayout>
</template>
