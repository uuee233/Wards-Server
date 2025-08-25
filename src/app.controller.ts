import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User, users } from './user';
import { clients } from './main';

interface CardDefinition {
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
}

// 定义卡池 - 包含名称和稀有度
const BrothersInArms_Pack: CardDefinition[] = [
  { name: 'card_event_usa_promo2', rarity: 'unique' },
  { name: 'card_event_bombing_run', rarity: 'common' },
  { name: 'card_event_carrier_support', rarity: 'uncommon' },
  { name: 'card_event_dogfight_usa', rarity: 'uncommon' },
  { name: 'card_event_flank_attack_sov', rarity: 'uncommon' },
  { name: 'card_event_for_our_freedom', rarity: 'rare' },
  { name: 'card_event_french_promo2', rarity: 'uncommon' },
  { name: 'card_event_inspired_tactics', rarity: 'common' },
  { name: 'card_event_ruthless_planning', rarity: 'common' },
  { name: 'card_event_secret_service', rarity: 'common' },
  { name: 'card_event_soviet_promo3', rarity: 'uncommon' },
  { name: 'card_event_top_deck_play_test', rarity: 'rare' },
  { name: 'card_unit_110th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_211th_basargino', rarity: 'common' },
  { name: 'card_unit_1st_pulk_piechoty', rarity: 'rare' },
  { name: 'card_unit_britain_promo1', rarity: 'uncommon' },
  { name: 'card_unit_japan_promo1', rarity: 'uncommon' },
  { name: 'card_unit_royal_sussex', rarity: 'rare' },
  { name: 'card_unit_soviet_promo1', rarity: 'rare' },
  { name: 'card_unit_beriev_be_4', rarity: 'unique' },
  { name: 'card_unit_kokuras_sword', rarity: 'unique' },
  { name: 'card_event_committed_crew', rarity: 'unique' },
  { name: 'card_unit_6th_airlanding_brigade', rarity: 'unique' },
  { name: 'card_unit_stuka_brothers', rarity: 'unique' },
  { name: 'card_unit_ki_49_donryu', rarity: 'unique' },
  { name: 'card_unit_bm_13n_us6', rarity: 'unique' },
  { name: 'card_event_gambit', rarity: 'unique' },
  { name: 'card_unit_35_grenadier', rarity: 'unique' },
  { name: 'card_unit_119_grenadier', rarity: 'unique' },
  { name: 'card_event_shinano', rarity: 'unique' },
  { name: 'card_unit_327th_pathfinders', rarity: 'unique' },
  { name: 'card_unit_p51_b', rarity: 'unique' },
  { name: 'card_event_night_bombing', rarity: 'unique' },
  { name: 'card_event_sincerely_yours', rarity: 'unique' },
  { name: 'card_event_protect_the_pocket', rarity: 'unique' },
  { name: 'card_event_on_the_horizon', rarity: 'rare' },
  { name: 'card_event_japan_duty', rarity: 'rare' },
  { name: 'card_unit_matsumoto_regiment', rarity: 'rare' },
  { name: 'card_unit_66th_independent', rarity: 'rare' },
  { name: 'card_unit_me_bf_109_brothers', rarity: 'rare' },
  { name: 'card_unit_7_schutzen', rarity: 'rare' },
  { name: 'card_event_maelstrom', rarity: 'rare' },
  { name: 'card_event_refit_bia', rarity: 'rare' },
  { name: 'card_event_desert_raid', rarity: 'rare' },
  { name: 'card_event_partnership', rarity: 'rare' },
  { name: 'card_unit_green_howards', rarity: 'rare' },
  { name: 'card_unit_vildebeest', rarity: 'rare' },
  { name: 'card_unit_bt_7_1937', rarity: 'rare' },
  { name: 'card_unit_tupolev_sb_2', rarity: 'rare' },
  { name: 'card_event_spearhead', rarity: 'rare' },
  { name: 'card_event_urban_fighting', rarity: 'rare' },
  { name: 'card_unit_48th_armored_infantry', rarity: 'rare' },
  { name: 'card_unit_158th_bushmasters', rarity: 'rare' },
  { name: 'card_unit_179th_tomahawks', rarity: 'rare' },
  { name: 'card_event_field_hospital', rarity: 'rare' },
  { name: 'card_unit_31e_algiers', rarity: 'rare' },
  { name: 'card_event_naval_engagement', rarity: 'rare' },
  { name: 'card_unit_macchi_c205', rarity: 'rare' },
  { name: 'card_unit_yak_9_pl', rarity: 'rare' },
  { name: 'card_unit_panzer_i_brothers', rarity: 'uncommon' },
  { name: 'card_unit_39_panzergrenadier', rarity: 'uncommon' },
  { name: 'card_unit_me_bf_110_brothers', rarity: 'uncommon' },
  { name: 'card_unit_list_regiment', rarity: 'uncommon' },
  { name: 'card_event_escort_group', rarity: 'uncommon' },
  { name: 'card_event_hms_hermes', rarity: 'uncommon' },
  { name: 'card_unit_hurricane_mk_ii_c_trop', rarity: 'uncommon' },
  { name: 'card_unit_blenheim_mk_i', rarity: 'uncommon' },
  { name: 'card_event_the_mighty_fall', rarity: 'uncommon' },
  { name: 'card_event_enemy_at_the_gates', rarity: 'uncommon' },
  { name: 'card_unit_49th_karachev', rarity: 'uncommon' },
  { name: 'card_unit_266th_guards_rifles', rarity: 'uncommon' },
  { name: 'card_event_fortunes_of_war', rarity: 'uncommon' },
  { name: 'card_event_asw_patrol', rarity: 'uncommon' },
  { name: 'card_unit_3_inch_m5', rarity: 'uncommon' },
  { name: 'card_unit_8th_marines', rarity: 'uncommon' },
  { name: 'card_unit_56th_recon', rarity: 'uncommon' },
  { name: 'card_unit_ki_45_dragon_slayer', rarity: 'uncommon' },
  { name: 'card_unit_okayama_regiment', rarity: 'uncommon' },
  { name: 'card_event_stealth_mission', rarity: 'uncommon' },
  { name: 'card_unit_1e_bfl', rarity: 'uncommon' },
  { name: 'card_unit_fiat_cr_32', rarity: 'uncommon' },
  { name: 'card_unit_35th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_event_rout', rarity: 'common' },
  { name: 'card_event_support_colum', rarity: 'common' },
  { name: 'card_event_momentum', rarity: 'common' },
  { name: 'card_unit_50_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_101_infantry_regiment', rarity: 'common' },
  { name: 'card_event_close_call', rarity: 'common' },
  { name: 'card_event_stiff_upper_lip', rarity: 'common' },
  { name: 'card_event_strong_bond', rarity: 'common' },
  { name: 'card_unit_kings_own_scottish', rarity: 'common' },
  { name: 'card_unit_185th_brigade', rarity: 'common' },
  { name: 'card_event_stand_together_brothers', rarity: 'common' },
  { name: 'card_event_ancestral_call', rarity: 'common' },
  { name: 'card_unit_1357th_rifles', rarity: 'common' },
  { name: 'card_unit_91st_astrakhan', rarity: 'common' },
  { name: 'card_unit_14th_guards_rifles', rarity: 'common' },
  { name: 'card_event_attrition', rarity: 'common' },
  { name: 'card_event_battle_valor', rarity: 'common' },
  { name: 'card_event_manpower', rarity: 'common' },
  { name: 'card_unit_seabees', rarity: 'common' },
  { name: 'card_unit_6th_infantry_regiment_usa', rarity: 'common' },
  { name: 'card_event_diplomatic_attache', rarity: 'common' },
  { name: 'card_event_under_fire_japan', rarity: 'common' },
  { name: 'card_event_island_fighting', rarity: 'common' },
  { name: 'card_event_jungle_warfare', rarity: 'common' },
  { name: 'card_unit_24th_cavalry_regiment', rarity: 'common' },
  { name: 'card_event_plan_d', rarity: 'common' },
  { name: 'card_event_ambush', rarity: 'common' },
  { name: 'card_event_brute_force', rarity: 'common' },
  { name: 'card_unit_80th_pasubio', rarity: 'common' },
  { name: 'card_event_rapid_response', rarity: 'common' },
  { name: 'card_event_act_on_the_intel', rarity: 'common' },
];

const BrothersInArms_Pack_7: CardDefinition[] = [
  { name: 'card_event_usa_promo2', rarity: 'unique' },
  { name: 'card_event_bombing_run', rarity: 'common' },
  { name: 'card_event_carrier_support', rarity: 'uncommon' },
  { name: 'card_event_dogfight_usa', rarity: 'uncommon' },
  { name: 'card_event_flank_attack_sov', rarity: 'uncommon' },
  { name: 'card_event_for_our_freedom', rarity: 'rare' },
  { name: 'card_event_french_promo2', rarity: 'uncommon' },
  { name: 'card_event_inspired_tactics', rarity: 'common' },
  { name: 'card_event_ruthless_planning', rarity: 'common' },
  { name: 'card_event_secret_service', rarity: 'common' },
  { name: 'card_event_soviet_promo3', rarity: 'uncommon' },
  { name: 'card_event_top_deck_play_test', rarity: 'rare' },
  { name: 'card_unit_110th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_211th_basargino', rarity: 'common' },
  { name: 'card_unit_1st_pulk_piechoty', rarity: 'rare' },
  { name: 'card_unit_britain_promo1', rarity: 'uncommon' },
  { name: 'card_unit_japan_promo1', rarity: 'uncommon' },
  { name: 'card_unit_royal_sussex', rarity: 'rare' },
  { name: 'card_unit_soviet_promo1', rarity: 'rare' },
  { name: 'card_unit_beriev_be_4', rarity: 'unique' },
  { name: 'card_unit_kokuras_sword', rarity: 'unique' },
  { name: 'card_event_committed_crew', rarity: 'unique' },
  { name: 'card_unit_6th_airlanding_brigade', rarity: 'unique' },
  { name: 'card_unit_stuka_brothers', rarity: 'unique' },
  { name: 'card_unit_ki_49_donryu', rarity: 'unique' },
  { name: 'card_unit_bm_13n_us6', rarity: 'unique' },
  { name: 'card_event_gambit', rarity: 'unique' },
  { name: 'card_unit_35_grenadier', rarity: 'unique' },
  { name: 'card_unit_119_grenadier', rarity: 'unique' },
  { name: 'card_event_shinano', rarity: 'unique' },
  { name: 'card_unit_327th_pathfinders', rarity: 'unique' },
  { name: 'card_unit_p51_b', rarity: 'unique' },
  { name: 'card_event_night_bombing', rarity: 'unique' },
  { name: 'card_event_sincerely_yours', rarity: 'unique' },
  { name: 'card_event_protect_the_pocket', rarity: 'unique' },
  { name: 'card_event_on_the_horizon', rarity: 'rare' },
  { name: 'card_event_japan_duty', rarity: 'rare' },
  { name: 'card_unit_matsumoto_regiment', rarity: 'rare' },
  { name: 'card_unit_66th_independent', rarity: 'rare' },
  { name: 'card_unit_me_bf_109_brothers', rarity: 'rare' },
  { name: 'card_unit_7_schutzen', rarity: 'rare' },
  { name: 'card_event_maelstrom', rarity: 'rare' },
  { name: 'card_event_refit_bia', rarity: 'rare' },
  { name: 'card_event_desert_raid', rarity: 'rare' },
  { name: 'card_event_partnership', rarity: 'rare' },
  { name: 'card_unit_green_howards', rarity: 'rare' },
  { name: 'card_unit_vildebeest', rarity: 'rare' },
  { name: 'card_unit_bt_7_1937', rarity: 'rare' },
  { name: 'card_unit_tupolev_sb_2', rarity: 'rare' },
  { name: 'card_event_spearhead', rarity: 'rare' },
  { name: 'card_event_urban_fighting', rarity: 'rare' },
  { name: 'card_unit_48th_armored_infantry', rarity: 'rare' },
  { name: 'card_unit_158th_bushmasters', rarity: 'rare' },
  { name: 'card_unit_179th_tomahawks', rarity: 'rare' },
  { name: 'card_event_field_hospital', rarity: 'rare' },
  { name: 'card_unit_31e_algiers', rarity: 'rare' },
  { name: 'card_event_naval_engagement', rarity: 'rare' },
  { name: 'card_unit_macchi_c205', rarity: 'rare' },
  { name: 'card_unit_yak_9_pl', rarity: 'rare' },
  { name: 'card_unit_panzer_i_brothers', rarity: 'uncommon' },
  { name: 'card_unit_39_panzergrenadier', rarity: 'uncommon' },
  { name: 'card_unit_me_bf_110_brothers', rarity: 'uncommon' },
  { name: 'card_unit_list_regiment', rarity: 'uncommon' },
  { name: 'card_event_escort_group', rarity: 'uncommon' },
  { name: 'card_event_hms_hermes', rarity: 'uncommon' },
  { name: 'card_unit_hurricane_mk_ii_c_trop', rarity: 'uncommon' },
  { name: 'card_unit_blenheim_mk_i', rarity: 'uncommon' },
  { name: 'card_event_the_mighty_fall', rarity: 'uncommon' },
  { name: 'card_event_enemy_at_the_gates', rarity: 'uncommon' },
  { name: 'card_unit_49th_karachev', rarity: 'uncommon' },
  { name: 'card_unit_266th_guards_rifles', rarity: 'uncommon' },
  { name: 'card_event_fortunes_of_war', rarity: 'uncommon' },
  { name: 'card_event_asw_patrol', rarity: 'uncommon' },
  { name: 'card_unit_3_inch_m5', rarity: 'uncommon' },
  { name: 'card_unit_8th_marines', rarity: 'uncommon' },
  { name: 'card_unit_56th_recon', rarity: 'uncommon' },
  { name: 'card_unit_ki_45_dragon_slayer', rarity: 'uncommon' },
  { name: 'card_unit_okayama_regiment', rarity: 'uncommon' },
  { name: 'card_event_stealth_mission', rarity: 'uncommon' },
  { name: 'card_unit_1e_bfl', rarity: 'uncommon' },
  { name: 'card_unit_fiat_cr_32', rarity: 'uncommon' },
  { name: 'card_unit_35th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_event_rout', rarity: 'common' },
  { name: 'card_event_support_colum', rarity: 'common' },
  { name: 'card_event_momentum', rarity: 'common' },
  { name: 'card_unit_50_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_101_infantry_regiment', rarity: 'common' },
  { name: 'card_event_close_call', rarity: 'common' },
  { name: 'card_event_stiff_upper_lip', rarity: 'common' },
  { name: 'card_event_strong_bond', rarity: 'common' },
  { name: 'card_unit_kings_own_scottish', rarity: 'common' },
  { name: 'card_unit_185th_brigade', rarity: 'common' },
  { name: 'card_event_stand_together_brothers', rarity: 'common' },
  { name: 'card_event_ancestral_call', rarity: 'common' },
  { name: 'card_unit_1357th_rifles', rarity: 'common' },
  { name: 'card_unit_91st_astrakhan', rarity: 'common' },
  { name: 'card_unit_14th_guards_rifles', rarity: 'common' },
  { name: 'card_event_attrition', rarity: 'common' },
  { name: 'card_event_battle_valor', rarity: 'common' },
  { name: 'card_event_manpower', rarity: 'common' },
  { name: 'card_unit_seabees', rarity: 'common' },
  { name: 'card_unit_6th_infantry_regiment_usa', rarity: 'common' },
  { name: 'card_event_diplomatic_attache', rarity: 'common' },
  { name: 'card_event_under_fire_japan', rarity: 'common' },
  { name: 'card_event_island_fighting', rarity: 'common' },
  { name: 'card_event_jungle_warfare', rarity: 'common' },
  { name: 'card_unit_24th_cavalry_regiment', rarity: 'common' },
  { name: 'card_event_plan_d', rarity: 'common' },
  { name: 'card_event_ambush', rarity: 'common' },
  { name: 'card_event_brute_force', rarity: 'common' },
  { name: 'card_unit_80th_pasubio', rarity: 'common' },
  { name: 'card_event_rapid_response', rarity: 'common' },
  { name: 'card_event_act_on_the_intel', rarity: 'common' },
];

const Allegiance_Pack: CardDefinition[] = [
  { name: 'card_event_imperial_decree', rarity: 'common' },
  { name: 'card_event_no_retreat', rarity: 'common' },
  { name: 'card_unit_34th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_3rd_alpini', rarity: 'common' },
  { name: 'card_event_colonial_dreams', rarity: 'common' },
  { name: 'card_event_desert_push', rarity: 'common' },
  { name: 'card_unit_fiat_cr_42', rarity: 'common' },
  { name: 'card_unit_l6_40', rarity: 'common' },
  { name: 'card_event_magic', rarity: 'common' },
  { name: 'card_event_naval_task_force', rarity: 'common' },
  { name: 'card_unit_panzer_ii_c', rarity: 'common' },
  { name: 'card_unit_polikarpov_po_2', rarity: 'common' },
  { name: 'card_event_resolute_defense', rarity: 'common' },
  { name: 'card_event_rush_production', rarity: 'common' },
  { name: 'card_unit_shibata_regiment', rarity: 'common' },
  { name: 'card_event_sneak_maneuver', rarity: 'common' },
  { name: 'card_event_sortie', rarity: 'common' },
  { name: 'card_event_veteran_pilots', rarity: 'common' },
  { name: 'card_event_test_resistance2', rarity: 'common' },
  { name: 'card_unit_welsh_guards', rarity: 'common' },
  { name: 'card_event_barrage', rarity: 'common' },
  { name: 'card_unit_french_expedition', rarity: 'common' },
  { name: 'card_unit_f4f_3_wildcat', rarity: 'common' },
  { name: 'card_unit_henschel_hs_126', rarity: 'common' },
  { name: 'card_unit_hotchkiss_35', rarity: 'common' },
  { name: 'card_unit_macchi_c202', rarity: 'common' },
  { name: 'card_event_retaliation', rarity: 'common' },
  { name: 'card_event_spoils_of_war', rarity: 'common' },
  { name: 'card_event_merchant_navy', rarity: 'common' },
  { name: 'card_unit_type_1_37mm', rarity: 'common' },
  { name: 'card_unit_10th_guards_regiment', rarity: 'common' },
  { name: 'card_unit_11th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_blenheim_mk_iv', rarity: 'common' },
  { name: 'card_unit_d4y_suisei', rarity: 'common' },
  { name: 'card_unit_ms_460', rarity: 'common' },
  { name: 'card_unit_stug_iii_g', rarity: 'common' },
  { name: 'card_unit_valentine_mk_iii', rarity: 'common' },
  { name: 'card_unit_25_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_french_75', rarity: 'common' },
  { name: 'card_event_gunboat_raid', rarity: 'common' },
  { name: 'card_unit_lancashire_fusiliers', rarity: 'common' },
  { name: 'card_unit_su_85', rarity: 'common' },
  { name: 'card_unit_a26_invader', rarity: 'common' },
  { name: 'card_event_grounded', rarity: 'common' },
  { name: 'card_unit_m8_howitzer', rarity: 'common' },
  { name: 'card_unit_osaka_regiment', rarity: 'common' },
  { name: 'card_event_supply_front', rarity: 'common' },
  { name: 'card_unit_4_5_inch_medium_gun', rarity: 'common' },
  { name: 'card_unit_34th_guards', rarity: 'common' },

  { name: 'card_unit_1st_airborne', rarity: 'uncommon' },
  { name: 'card_event_aerial_reconaissance', rarity: 'uncommon' },
  { name: 'card_event_carrier_cover', rarity: 'uncommon' },
  { name: 'card_unit_type94_tk', rarity: 'uncommon' },
  { name: 'card_unit_12th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_2nd_alpini', rarity: 'uncommon' },
  { name: 'card_unit_845th_rifles', rarity: 'uncommon' },
  { name: 'card_event_counter_offensive', rarity: 'uncommon' },
  { name: 'card_event_for_glory', rarity: 'uncommon' },
  { name: 'card_event_joint_operation', rarity: 'uncommon' },
  { name: 'card_event_mobile_defense', rarity: 'uncommon' },
  { name: 'card_unit_144th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_1st_marines', rarity: 'uncommon' },
  { name: 'card_unit_coldstream_guards', rarity: 'uncommon' },
  { name: 'card_event_eastern_front', rarity: 'uncommon' },
  { name: 'card_unit_flammpanzer', rarity: 'uncommon' },
  { name: 'card_unit_33rd_livorno', rarity: 'uncommon' },
  { name: 'card_unit_b_26_bretagne', rarity: 'uncommon' },
  { name: 'card_event_call_to_the_colonies', rarity: 'uncommon' },
  { name: 'card_unit_dewoitine_520', rarity: 'uncommon' },
  { name: 'card_unit_fiat_g55', rarity: 'uncommon' },
  { name: 'card_unit_heinkel_he_219', rarity: 'uncommon' },
  { name: 'card_unit_ju_87_b2', rarity: 'uncommon' },
  { name: 'card_unit_mig_3', rarity: 'uncommon' },
  { name: 'card_unit_sm_79', rarity: 'uncommon' },
  { name: 'card_unit_type_1_chi_he', rarity: 'uncommon' },
  { name: 'card_unit_1271st_rifles', rarity: 'uncommon' },
  { name: 'card_unit_b_25h', rarity: 'uncommon' },
  { name: 'card_unit_hummel', rarity: 'uncommon' },
  { name: 'card_event_spirit_of_rome', rarity: 'uncommon' },
  { name: 'card_unit_a_36_apache', rarity: 'uncommon' },
  { name: 'card_unit_ki_61_tony', rarity: 'uncommon' },
  { name: 'card_event_lend_lease', rarity: 'uncommon' },
  { name: 'card_event_sabotage', rarity: 'uncommon' },
  { name: 'card_unit_tempest_mk_v', rarity: 'uncommon' },

  { name: 'card_unit_109th_combat_engineers', rarity: 'rare' },
  { name: 'card_unit_111th_indian_brigade', rarity: 'rare' },
  { name: 'card_event_honorable_death', rarity: 'rare' },
  { name: 'card_unit_ki_51_sonia', rarity: 'rare' },
  { name: 'card_event_men_of_steel', rarity: 'rare' },
  { name: 'card_event_raid', rarity: 'rare' },
  { name: 'card_event_secret_operatives', rarity: 'rare' },
  { name: 'card_event_strafing', rarity: 'rare' },
  { name: 'card_event_stranglehold', rarity: 'rare' },
  { name: 'card_unit_141_gebirgsjager', rarity: 'rare' },
  { name: 'card_unit_185th_folgore', rarity: 'rare' },
  { name: 'card_event_elusive_force', rarity: 'rare' },
  { name: 'card_event_embargo', rarity: 'rare' },
  { name: 'card_event_mud', rarity: 'rare' },
  { name: 'card_unit_t_80', rarity: 'rare' },
  { name: 'card_unit_39th_bologna', rarity: 'rare' },
  { name: 'card_unit_kagoshima_regiment', rarity: 'rare' },
  { name: 'card_unit_obice_da_75_13', rarity: 'rare' },
  { name: 'card_unit_semovente_75_18', rarity: 'rare' },
  { name: 'card_event_u_99', rarity: 'rare' },
  { name: 'card_unit_106th_quartermasters', rarity: 'rare' },
  { name: 'card_unit_2e_brigade', rarity: 'rare' },
  { name: 'card_unit_a6m3_zeke', rarity: 'rare' },
  { name: 'card_event_arming_resistance', rarity: 'rare' },
  { name: 'card_unit_m4a1', rarity: 'rare' },
  { name: 'card_event_pact_of_steel', rarity: 'rare' },
  { name: 'card_unit_panzer_iii_h', rarity: 'rare' },
  { name: 'card_unit_typhoon_mk_ib', rarity: 'rare' },
  { name: 'card_unit_char_b1_bis', rarity: 'rare' },
  { name: 'card_event_italian_human_torpedo', rarity: 'rare' },
  { name: 'card_unit_panther_a', rarity: 'rare' },
  { name: 'card_unit_155_c_model_1917', rarity: 'rare' },
  { name: 'card_event_liberation', rarity: 'rare' },
  { name: 'card_unit_kv_ii', rarity: 'rare' },

  { name: 'card_event_lurking_danger', rarity: 'unique' },
  { name: 'card_unit_1st_yokosuka', rarity: 'unique' },
  { name: 'card_event_desperate_measures', rarity: 'unique' },
  { name: 'card_event_isolation', rarity: 'unique' },
  { name: 'card_event_counter_strike', rarity: 'unique' },
  { name: 'card_event_night_witches', rarity: 'unique' },
  { name: 'card_unit_p_40b_tomahawk', rarity: 'unique' },
  { name: 'card_event_parade', rarity: 'unique' },
  { name: 'card_unit_royal_ulster_rifles', rarity: 'unique' },
  { name: 'card_unit_no43_commando', rarity: 'unique' },
  { name: 'card_unit_p_61_black_widow', rarity: 'unique' },
  { name: 'card_event_shelling', rarity: 'unique' },
  { name: 'card_unit_83rd_naval_brigade', rarity: 'unique' },
  { name: 'card_event_kriegsmarine', rarity: 'unique' },
  { name: 'card_unit_manchester_ia', rarity: 'unique' },
  { name: 'card_unit_tiger_i_e', rarity: 'unique' },
  { name: 'card_event_strategic_planning', rarity: 'unique' },
  { name: 'card_event_to_the_last_man', rarity: 'unique' },
  { name: 'card_unit_b_29_super_fortress', rarity: 'unique' },
];

const Allegiance_Pack_7: CardDefinition[] = [
  { name: 'card_event_imperial_decree', rarity: 'common' },
  { name: 'card_event_no_retreat', rarity: 'common' },
  { name: 'card_unit_34th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_3rd_alpini', rarity: 'common' },
  { name: 'card_event_colonial_dreams', rarity: 'common' },
  { name: 'card_event_desert_push', rarity: 'common' },
  { name: 'card_unit_fiat_cr_42', rarity: 'common' },
  { name: 'card_unit_l6_40', rarity: 'common' },
  { name: 'card_event_magic', rarity: 'common' },
  { name: 'card_event_naval_task_force', rarity: 'common' },
  { name: 'card_unit_panzer_ii_c', rarity: 'common' },
  { name: 'card_unit_polikarpov_po_2', rarity: 'common' },
  { name: 'card_event_resolute_defense', rarity: 'common' },
  { name: 'card_event_rush_production', rarity: 'common' },
  { name: 'card_unit_shibata_regiment', rarity: 'common' },
  { name: 'card_event_sneak_maneuver', rarity: 'common' },
  { name: 'card_event_sortie', rarity: 'common' },
  { name: 'card_event_veteran_pilots', rarity: 'common' },
  { name: 'card_event_test_resistance2', rarity: 'common' },
  { name: 'card_unit_welsh_guards', rarity: 'common' },
  { name: 'card_event_barrage', rarity: 'common' },
  { name: 'card_unit_french_expedition', rarity: 'common' },
  { name: 'card_unit_f4f_3_wildcat', rarity: 'common' },
  { name: 'card_unit_henschel_hs_126', rarity: 'common' },
  { name: 'card_unit_hotchkiss_35', rarity: 'common' },
  { name: 'card_unit_macchi_c202', rarity: 'common' },
  { name: 'card_event_retaliation', rarity: 'common' },
  { name: 'card_event_spoils_of_war', rarity: 'common' },
  { name: 'card_event_merchant_navy', rarity: 'common' },
  { name: 'card_unit_type_1_37mm', rarity: 'common' },
  { name: 'card_unit_10th_guards_regiment', rarity: 'common' },
  { name: 'card_unit_11th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_blenheim_mk_iv', rarity: 'common' },
  { name: 'card_unit_d4y_suisei', rarity: 'common' },
  { name: 'card_unit_ms_460', rarity: 'common' },
  { name: 'card_unit_stug_iii_g', rarity: 'common' },
  { name: 'card_unit_valentine_mk_iii', rarity: 'common' },
  { name: 'card_unit_25_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_french_75', rarity: 'common' },
  { name: 'card_event_gunboat_raid', rarity: 'common' },
  { name: 'card_unit_lancashire_fusiliers', rarity: 'common' },
  { name: 'card_unit_su_85', rarity: 'common' },
  { name: 'card_unit_a26_invader', rarity: 'common' },
  { name: 'card_event_grounded', rarity: 'common' },
  { name: 'card_unit_m8_howitzer', rarity: 'common' },
  { name: 'card_unit_osaka_regiment', rarity: 'common' },
  { name: 'card_event_supply_front', rarity: 'common' },
  { name: 'card_unit_4_5_inch_medium_gun', rarity: 'common' },
  { name: 'card_unit_34th_guards', rarity: 'common' },

  { name: 'card_unit_1st_airborne', rarity: 'uncommon' },
  { name: 'card_event_aerial_reconaissance', rarity: 'uncommon' },
  { name: 'card_event_carrier_cover', rarity: 'uncommon' },
  { name: 'card_unit_type94_tk', rarity: 'uncommon' },
  { name: 'card_unit_12th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_2nd_alpini', rarity: 'uncommon' },
  { name: 'card_unit_845th_rifles', rarity: 'uncommon' },
  { name: 'card_event_counter_offensive', rarity: 'uncommon' },
  { name: 'card_event_for_glory', rarity: 'uncommon' },
  { name: 'card_event_joint_operation', rarity: 'uncommon' },
  { name: 'card_event_mobile_defense', rarity: 'uncommon' },
  { name: 'card_unit_144th_infantry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_1st_marines', rarity: 'uncommon' },
  { name: 'card_unit_coldstream_guards', rarity: 'uncommon' },
  { name: 'card_event_eastern_front', rarity: 'uncommon' },
  { name: 'card_unit_flammpanzer', rarity: 'uncommon' },
  { name: 'card_unit_33rd_livorno', rarity: 'uncommon' },
  { name: 'card_unit_b_26_bretagne', rarity: 'uncommon' },
  { name: 'card_event_call_to_the_colonies', rarity: 'uncommon' },
  { name: 'card_unit_dewoitine_520', rarity: 'uncommon' },
  { name: 'card_unit_fiat_g55', rarity: 'uncommon' },
  { name: 'card_unit_heinkel_he_219', rarity: 'uncommon' },
  { name: 'card_unit_ju_87_b2', rarity: 'uncommon' },
  { name: 'card_unit_mig_3', rarity: 'uncommon' },
  { name: 'card_unit_sm_79', rarity: 'uncommon' },
  { name: 'card_unit_type_1_chi_he', rarity: 'uncommon' },
  { name: 'card_unit_1271st_rifles', rarity: 'uncommon' },
  { name: 'card_unit_b_25h', rarity: 'uncommon' },
  { name: 'card_unit_hummel', rarity: 'uncommon' },
  { name: 'card_event_spirit_of_rome', rarity: 'uncommon' },
  { name: 'card_unit_a_36_apache', rarity: 'uncommon' },
  { name: 'card_unit_ki_61_tony', rarity: 'uncommon' },
  { name: 'card_event_lend_lease', rarity: 'uncommon' },
  { name: 'card_event_sabotage', rarity: 'uncommon' },
  { name: 'card_unit_tempest_mk_v', rarity: 'uncommon' },

  { name: 'card_unit_109th_combat_engineers', rarity: 'rare' },
  { name: 'card_unit_111th_indian_brigade', rarity: 'rare' },
  { name: 'card_event_honorable_death', rarity: 'rare' },
  { name: 'card_unit_ki_51_sonia', rarity: 'rare' },
  { name: 'card_event_men_of_steel', rarity: 'rare' },
  { name: 'card_event_raid', rarity: 'rare' },
  { name: 'card_event_secret_operatives', rarity: 'rare' },
  { name: 'card_event_strafing', rarity: 'rare' },
  { name: 'card_event_stranglehold', rarity: 'rare' },
  { name: 'card_unit_141_gebirgsjager', rarity: 'rare' },
  { name: 'card_unit_185th_folgore', rarity: 'rare' },
  { name: 'card_event_elusive_force', rarity: 'rare' },
  { name: 'card_event_embargo', rarity: 'rare' },
  { name: 'card_event_mud', rarity: 'rare' },
  { name: 'card_unit_t_80', rarity: 'rare' },
  { name: 'card_unit_39th_bologna', rarity: 'rare' },
  { name: 'card_unit_kagoshima_regiment', rarity: 'rare' },
  { name: 'card_unit_obice_da_75_13', rarity: 'rare' },
  { name: 'card_unit_semovente_75_18', rarity: 'rare' },
  { name: 'card_event_u_99', rarity: 'rare' },
  { name: 'card_unit_106th_quartermasters', rarity: 'rare' },
  { name: 'card_unit_2e_brigade', rarity: 'rare' },
  { name: 'card_unit_a6m3_zeke', rarity: 'rare' },
  { name: 'card_event_arming_resistance', rarity: 'rare' },
  { name: 'card_unit_m4a1', rarity: 'rare' },
  { name: 'card_event_pact_of_steel', rarity: 'rare' },
  { name: 'card_unit_panzer_iii_h', rarity: 'rare' },
  { name: 'card_unit_typhoon_mk_ib', rarity: 'rare' },
  { name: 'card_unit_char_b1_bis', rarity: 'rare' },
  { name: 'card_event_italian_human_torpedo', rarity: 'rare' },
  { name: 'card_unit_panther_a', rarity: 'rare' },
  { name: 'card_unit_155_c_model_1917', rarity: 'rare' },
  { name: 'card_event_liberation', rarity: 'rare' },
  { name: 'card_unit_kv_ii', rarity: 'rare' },

  { name: 'card_event_lurking_danger', rarity: 'unique' },
  { name: 'card_unit_1st_yokosuka', rarity: 'unique' },
  { name: 'card_event_desperate_measures', rarity: 'unique' },
  { name: 'card_event_isolation', rarity: 'unique' },
  { name: 'card_event_counter_strike', rarity: 'unique' },
  { name: 'card_event_night_witches', rarity: 'unique' },
  { name: 'card_unit_p_40b_tomahawk', rarity: 'unique' },
  { name: 'card_event_parade', rarity: 'unique' },
  { name: 'card_unit_royal_ulster_rifles', rarity: 'unique' },
  { name: 'card_unit_no43_commando', rarity: 'unique' },
  { name: 'card_unit_p_61_black_widow', rarity: 'unique' },
  { name: 'card_event_shelling', rarity: 'unique' },
  { name: 'card_unit_83rd_naval_brigade', rarity: 'unique' },
  { name: 'card_event_kriegsmarine', rarity: 'unique' },
  { name: 'card_unit_manchester_ia', rarity: 'unique' },
  { name: 'card_unit_tiger_i_e', rarity: 'unique' },
  { name: 'card_event_strategic_planning', rarity: 'unique' },
  { name: 'card_event_to_the_last_man', rarity: 'unique' },
  { name: 'card_unit_b_29_super_fortress', rarity: 'unique' },
];

const CARD_POOL: CardDefinition[] = [
  { name: 'card_unit_554th_rifles', rarity: 'common' },
  { name: 'card_event_unexpected_resistance', rarity: 'common' },
  { name: 'card_event_usace', rarity: 'common' },
  { name: 'card_event_war_production', rarity: 'common' },
  { name: 'card_unit_1st_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_321st_rifles', rarity: 'common' },
  { name: 'card_unit_4_pioneer', rarity: 'common' },
  { name: 'card_unit_463rd_battalion', rarity: 'common' },
  { name: 'card_unit_506th_airborne', rarity: 'common' },
  { name: 'card_unit_89th_infantry', rarity: 'common' },
  { name: 'card_event_aa_barrage', rarity: 'common' },
  { name: 'card_event_awoken_giant', rarity: 'common' },
  { name: 'card_event_blackout', rarity: 'common' },
  { name: 'card_event_bloody_sickle', rarity: 'common' },
  { name: 'card_event_burning_sky', rarity: 'common' },
  { name: 'card_event_careless_talk', rarity: 'common' },
  { name: 'card_event_close_air_support', rarity: 'common' },
  { name: 'card_event_combined_arms', rarity: 'common' },
  { name: 'card_event_cup_of_tea', rarity: 'common' },
  { name: 'card_event_deadly_duty', rarity: 'common' },
  { name: 'card_event_dive_bombing', rarity: 'common' },
  { name: 'card_event_final_push', rarity: 'common' },
  { name: 'card_unit_himeji_regiment', rarity: 'common' },
  { name: 'card_event_imperial_order', rarity: 'common' },
  { name: 'card_event_imperial_strength', rarity: 'common' },
  { name: 'card_event_interception', rarity: 'common' },
  { name: 'card_event_iron_from_the_north', rarity: 'common' },
  { name: 'card_event_land_of_the_free', rarity: 'common' },
  { name: 'card_unit_m8_greyhound', rarity: 'common' },
  { name: 'card_unit_model_25', rarity: 'common' },
  { name: 'card_event_naval_power', rarity: 'common' },
  { name: 'card_unit_pak_36', rarity: 'common' },
  { name: 'card_unit_panzer_ii_a', rarity: 'common' },
  { name: 'card_event_reserves', rarity: 'common' },
  { name: 'card_event_surprise_attack', rarity: 'common' },
  { name: 'card_event_tamanskya', rarity: 'common' },
  { name: 'card_unit_17th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_2_pounder', rarity: 'common' },
  { name: 'card_unit_flak_37_spg', rarity: 'common' },
  { name: 'card_unit_3rd_guards', rarity: 'common' },
  { name: 'card_unit_45mm_anti_tank_gun', rarity: 'common' },
  { name: 'card_unit_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_5th_brigade', rarity: 'common' },
  { name: 'card_unit_6th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_95th_rifles', rarity: 'common' },
  { name: 'card_unit_akita_regiment', rarity: 'common' },
  { name: 'card_event_ancient_empire', rarity: 'common' },
  { name: 'card_unit_bt_7', rarity: 'common' },
  { name: 'card_event_for_the_king', rarity: 'common' },
  { name: 'card_event_assault', rarity: 'common' },
  { name: 'card_unit_g4m1_betty', rarity: 'common' },
  { name: 'card_event_gunship', rarity: 'common' },
  { name: 'card_unit_i_16_ishak', rarity: 'common' },
  { name: 'card_event_national_fire_service', rarity: 'common' },
  { name: 'card_event_naval_support', rarity: 'common' },
  { name: 'card_unit_stug_III', rarity: 'common' },
  { name: 'card_event_supply_chain', rarity: 'common' },
  { name: 'card_event_supply_drop', rarity: 'common' },
  { name: 'card_event_supply_shipment', rarity: 'common' },
  { name: 'card_unit_t_70', rarity: 'common' },
  { name: 'card_unit_t19_howitzer', rarity: 'common' },
  { name: 'card_event_the_war_machine', rarity: 'common' },
  { name: 'card_event_tora_tora', rarity: 'common' },
  { name: 'card_unit_type_88_aa_gun', rarity: 'common' },
  { name: 'card_unit_type_95', rarity: 'common' },
  { name: 'card_event_ural_factories', rarity: 'common' },
  { name: 'card_unit_30th_regiment', rarity: 'common' },
  { name: 'card_unit_33_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_6_pounder', rarity: 'common' },
  { name: 'card_unit_84th_infantry', rarity: 'common' },
  { name: 'card_unit_baluch_regiment', rarity: 'common' },
  { name: 'card_event_burning_sun', rarity: 'common' },
  { name: 'card_event_convoy_175', rarity: 'common' },
  { name: 'card_event_eagle_claws', rarity: 'common' },
  { name: 'card_unit_f4f_wildcat', rarity: 'common' },
  { name: 'card_event_fortification', rarity: 'common' },
  { name: 'card_event_from_the_people', rarity: 'common' },
  { name: 'card_event_honor', rarity: 'common' },
  { name: 'card_unit_hurricane', rarity: 'common' },
  { name: 'card_unit_m5a1_stuart_tut', rarity: 'common' },
  { name: 'card_unit_mito_regiment', rarity: 'common' },
  { name: 'card_event_naval_operation', rarity: 'common' },
  { name: 'card_unit_p40_warhawk', rarity: 'common' },
  { name: 'card_unit_pak_38_vs_2', rarity: 'common' },
  { name: 'card_unit_panzer_38_t', rarity: 'common' },
  { name: 'card_unit_qf_40mm_mk_iii', rarity: 'common' },
  { name: 'card_event_reichsbank', rarity: 'common' },
  { name: 'card_unit_su_76', rarity: 'common' },
  { name: 'card_unit_t_26', rarity: 'common' },
  { name: 'card_unit_25_pounder', rarity: 'common' },
  { name: 'card_unit_7th_regiment', rarity: 'common' },
  { name: 'card_unit_8th_cavalry_regiment', rarity: 'common' },
  { name: 'card_unit_a20_havoc', rarity: 'common' },
  { name: 'card_unit_jagdpanther', rarity: 'common' },
  { name: 'card_unit_ju_87_stuka', rarity: 'common' },
  { name: 'card_unit_hayabusa', rarity: 'common' },
  { name: 'card_unit_m4_sherman', rarity: 'common' },
  { name: 'card_event_uncle_sam', rarity: 'common' },
  { name: 'card_unit_10_5_cm_lefh', rarity: 'common' },
  { name: 'card_unit_zero', rarity: 'common' },
  { name: 'card_unit_churchill', rarity: 'common' },
  { name: 'card_unit_corsair_f4u', rarity: 'common' },
  { name: 'card_unit_j1n1_gekko', rarity: 'common' },
  { name: 'card_unit_ki_61_hien', rarity: 'common' },
  { name: 'card_event_overwhelming_force', rarity: 'common' },
  { name: 'card_unit_panzer_iv_g', rarity: 'common' },
  { name: 'card_unit_spitfire', rarity: 'common' },
  { name: 'card_unit_t_34', rarity: 'common' },
  { name: 'card_unit_t_34_85', rarity: 'common' },
  { name: 'card_unit_fw_190', rarity: 'common' },
  { name: 'card_unit_spitfire_v', rarity: 'common' },

  { name: 'card_unit_15th_cavalry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_6th_naval_brigade', rarity: 'uncommon' },
  { name: 'card_event_air_superiority', rarity: 'uncommon' },
  { name: 'card_unit_gladiator', rarity: 'uncommon' },
  { name: 'card_unit_sd_kfz222x', rarity: 'uncommon' },
  { name: 'card_unit_swordfish', rarity: 'uncommon' },
  { name: 'card_event_tactical_withdrawal', rarity: 'uncommon' },
  { name: 'card_event_desert_rats', rarity: 'uncommon' },
  { name: 'card_unit_type_93', rarity: 'uncommon' },
  { name: 'card_event_winter_war', rarity: 'uncommon' },
  { name: 'card_unit_13th_rifle_regiment', rarity: 'uncommon' },
  { name: 'card_unit_3_fallschirmjager', rarity: 'uncommon' },
  { name: 'card_unit_a5m4_claude', rarity: 'uncommon' },
  { name: 'card_event_for_prosperety', rarity: 'uncommon' },
  { name: 'card_unit_katyusha', rarity: 'uncommon' },
  { name: 'card_unit_panzer_35_t', rarity: 'uncommon' },
  { name: 'card_event_scorched_earth', rarity: 'uncommon' },
  { name: 'card_event_sudden_strike', rarity: 'uncommon' },
  { name: 'card_unit_type_98_ke_ni', rarity: 'uncommon' },
  { name: 'card_event_u_375', rarity: 'uncommon' },
  { name: 'card_event_unity_is_strength', rarity: 'uncommon' },
  { name: 'card_unit_28cm_coasttal_howitzer', rarity: 'uncommon' },
  { name: 'card_unit_332nd_engineers', rarity: 'uncommon' },
  { name: 'card_unit_42nd_rifles', rarity: 'uncommon' },
  { name: 'card_unit_aichi_b7a2', rarity: 'uncommon' },
  { name: 'card_event_air_blitz', rarity: 'uncommon' },
  { name: 'card_event_amphibious_assault', rarity: 'uncommon' },
  { name: 'card_unit_argyllshire_highlanders', rarity: 'uncommon' },
  { name: 'card_event_blitzkrieg', rarity: 'uncommon' },
  { name: 'card_event_breakthrough', rarity: 'uncommon' },
  { name: 'card_unit_kumamoto_regiment', rarity: 'uncommon' },
  { name: 'card_unit_m16_halftrack', rarity: 'uncommon' },
  { name: 'card_unit_m7_priest', rarity: 'uncommon' },
  { name: 'card_unit_nebelwerfer', rarity: 'uncommon' },
  { name: 'card_event_reinforcements', rarity: 'uncommon' },
  { name: 'card_unit_sbd3_dauntless', rarity: 'uncommon' },
  { name: 'card_unit_stug_iv', rarity: 'uncommon' },
  { name: 'card_event_tactical_strike', rarity: 'uncommon' },
  { name: 'card_event_the_hammer', rarity: 'uncommon' },
  { name: 'card_unit_type_89', rarity: 'uncommon' },
  { name: 'card_unit_yak_3', rarity: 'uncommon' },
  { name: 'card_unit_1918_155mm', rarity: 'uncommon' },
  { name: 'card_unit_17_pounder', rarity: 'uncommon' },
  { name: 'card_unit_22nd_guards_brigade', rarity: 'uncommon' },
  { name: 'card_unit_75mm_field_artillery', rarity: 'uncommon' },
  { name: 'card_event_arctic_convoy', rarity: 'uncommon' },
  { name: 'card_unit_nakajima_b5n', rarity: 'uncommon' },
  { name: 'card_unit_skua_mk_ii', rarity: 'uncommon' },
  { name: 'card_event_critical_hit', rarity: 'uncommon' },
  { name: 'card_event_death_from_above', rarity: 'uncommon' },
  { name: 'card_unit_sally', rarity: 'uncommon' },
  { name: 'card_unit_ki_44_tojo', rarity: 'uncommon' },
  { name: 'card_unit_me_bf_110', rarity: 'uncommon' },
  { name: 'card_event_naval_bombardment_cam1', rarity: 'uncommon' },
  { name: 'card_unit_p38_lightning', rarity: 'uncommon' },
  { name: 'card_unit_panzer_iii_j', rarity: 'uncommon' },
  { name: 'card_event_for_precision_bombing', rarity: 'uncommon' },
  { name: 'card_event_red_october', rarity: 'uncommon' },
  { name: 'card_unit_royal_west_kents', rarity: 'uncommon' },
  { name: 'card_event_sky_barons', rarity: 'uncommon' },
  { name: 'card_unit_su_152', rarity: 'uncommon' },
  { name: 'card_event_blockade', rarity: 'uncommon' },
  { name: 'card_unit_hampden', rarity: 'uncommon' },
  { name: 'card_unit_ki_84_frank', rarity: 'uncommon' },
  { name: 'card_event_no_surrender', rarity: 'uncommon' },
  { name: 'card_unit_type_3_chi_nu', rarity: 'uncommon' },
  { name: 'card_event_war_bonds', rarity: 'uncommon' },
  { name: 'card_event_we_can_do_it', rarity: 'uncommon' },
  { name: 'card_unit_88_mm_flak', rarity: 'uncommon' },
  { name: 'card_unit_a_24_banshee', rarity: 'uncommon' },
  { name: 'card_unit_b_25_mitchell', rarity: 'uncommon' },
  { name: 'card_unit_p51_mustang', rarity: 'uncommon' },
  { name: 'card_unit_p1y_ginga', rarity: 'uncommon' },
  { name: 'card_unit_panzer_iv_f2', rarity: 'uncommon' },
  { name: 'card_unit_756th_regiment', rarity: 'uncommon' },
  { name: 'card_unit_coastal_gun', rarity: 'uncommon' },
  { name: 'card_unit_b_24', rarity: 'uncommon' },
  { name: 'card_unit_lancaster', rarity: 'uncommon' },

  { name: 'card_unit_10th_engineering_battalion', rarity: 'rare' },
  { name: 'card_unit_16th_rifles', rarity: 'rare' },
  { name: 'card_unit_33rd_recon', rarity: 'rare' },
  { name: 'card_unit_41st_bicycle_regiment', rarity: 'rare' },
  { name: 'card_unit_arado_ar_196', rarity: 'rare' },
  { name: 'card_event_burst_of_fire', rarity: 'rare' },
  { name: 'card_event_enemy_spotted', rarity: 'rare' },
  { name: 'card_event_for_freedom', rarity: 'rare' },
  { name: 'card_event_for_the_emperor', rarity: 'rare' },
  { name: 'card_event_in_the_navy', rarity: 'rare' },
  { name: 'card_unit_22_infantry', rarity: 'rare' },
  { name: 'card_unit_75mm_mountain_gun', rarity: 'rare' },
  { name: 'card_unit_99th_infantry', rarity: 'rare' },
  { name: 'card_unit_albacore', rarity: 'rare' },
  { name: 'card_event_blood_red_sky', rarity: 'rare' },
  { name: 'card_event_close_combat', rarity: 'rare' },
  { name: 'card_event_finest_hour', rarity: 'rare' },
  { name: 'card_unit_henschel_hs_123', rarity: 'rare' },
  { name: 'card_unit_i_15_chaika', rarity: 'rare' },
  { name: 'card_event_industrial_might', rarity: 'rare' },
  { name: 'card_unit_ki_27_nate', rarity: 'rare' },
  { name: 'card_event_missing', rarity: 'rare' },
  { name: 'card_event_mobilization', rarity: 'rare' },
  { name: 'card_event_order_no_227', rarity: 'rare' },
  { name: 'card_event_radar_alert', rarity: 'rare' },
  { name: 'card_unit_wirbelwind', rarity: 'rare' },
  { name: 'card_unit_35th_rifles', rarity: 'rare' },
  { name: 'card_unit_76mm_howitzer_1939', rarity: 'rare' },
  { name: 'card_unit_aichi_d3a', rarity: 'rare' },
  { name: 'card_event_airstrike_new', rarity: 'rare' },
  { name: 'card_event_atlantic_convoy', rarity: 'rare' },
  { name: 'card_event_code_of_bushido', rarity: 'rare' },
  { name: 'card_unit_crusader_mk_ii', rarity: 'rare' },
  { name: 'card_event_divine_wind', rarity: 'rare' },
  { name: 'card_event_encirclement', rarity: 'rare' },
  { name: 'card_unit_m18_hellcat', rarity: 'rare' },
  { name: 'card_unit_marder_iii_h', rarity: 'rare' },
  { name: 'card_event_mi_5', rarity: 'rare' },
  { name: 'card_event_naval_supply_run', rarity: 'rare' },
  { name: 'card_unit_petlyakov_pe_2', rarity: 'rare' },
  { name: 'card_event_torpedo_attack', rarity: 'rare' },
  { name: 'card_event_cadet_nurse_corps', rarity: 'rare' },
  { name: 'card_event_daylight_bombing', rarity: 'rare' },
  { name: 'card_event_enigma', rarity: 'rare' },
  { name: 'card_unit_hudson', rarity: 'rare' },
  { name: 'card_event_mass_attack', rarity: 'rare' },
  { name: 'card_event_mother_russia', rarity: 'rare' },
  { name: 'card_event_night_raid', rarity: 'rare' },
  { name: 'card_event_rescue_mission', rarity: 'rare' },
  { name: 'card_unit_sendai_regiment', rarity: 'rare' },
  { name: 'card_event_the_empire', rarity: 'rare' },
  { name: 'card_event_wolfpack', rarity: 'rare' },
  { name: 'card_unit_b4_203mm_howitzer', rarity: 'rare' },
  { name: 'card_unit_black_watch', rarity: 'rare' },
  { name: 'card_unit_p47d_thunderbolt', rarity: 'rare' },
  { name: 'card_unit_panther', rarity: 'rare' },
  { name: 'card_unit_p38_lightning_raf', rarity: 'rare' },
  { name: 'card_event_the_alliance', rarity: 'rare' },
  { name: 'card_unit_yak_9', rarity: 'rare' },
  { name: 'card_unit_85mm_d44', rarity: 'rare' },
  { name: 'card_event_blade_of_the_samurai', rarity: 'rare' },
  { name: 'card_unit_corsair_f4u_1d', rarity: 'rare' },
  { name: 'card_unit_dornier_do_217', rarity: 'rare' },
  { name: 'card_unit_grenadier_guards', rarity: 'rare' },
  { name: 'card_unit_kv_1', rarity: 'rare' },
  { name: 'card_unit_stirling', rarity: 'rare' },
  { name: 'card_event_annihilation', rarity: 'rare' },
  { name: 'card_event_carpet_bombing', rarity: 'rare' },
  { name: 'card_unit_junkers_ju_188', rarity: 'rare' },
  { name: 'card_event_patriotic_zeal', rarity: 'rare' },
  { name: 'card_unit_tbf_avanger', rarity: 'rare' },
  { name: 'card_unit_tiger_i', rarity: 'rare' },
  { name: 'card_unit_b_17', rarity: 'rare' },
  { name: 'card_event_empire_of_the_sun', rarity: 'rare' },

  { name: 'card_unit_158_nachschub', rarity: 'unique' },
  { name: 'card_unit_1st_signal_regiment', rarity: 'unique' },
  { name: 'card_unit_85_pioneer_company', rarity: 'unique' },
  { name: 'card_event_yamamoto', rarity: 'unique' },
  { name: 'card_event_fast_heinz', rarity: 'unique' },
  { name: 'card_event_monty', rarity: 'unique' },
  { name: 'card_event_patton', rarity: 'unique' },
  { name: 'card_event_zhukov', rarity: 'unique' },
  { name: 'card_event_air_defense', rarity: 'unique' },
  { name: 'card_unit_pete', rarity: 'unique' },
  { name: 'card_unit_grumman_hellcat2', rarity: 'unique' },
  { name: 'card_event_from_the_deep', rarity: 'unique' },
  { name: 'card_event_lightning_conquest_new', rarity: 'unique' },
  { name: 'card_event_red_banner', rarity: 'unique' },
  { name: 'card_event_siberian_transfer', rarity: 'unique' },
  { name: 'card_unit_15_cm_autokanone', rarity: 'unique' },
  { name: 'card_unit_1st_airlanding_brigade', rarity: 'unique' },
  { name: 'card_unit_2nd_raiding_brigade', rarity: 'unique' },
  { name: 'card_unit_cossack_cavalry', rarity: 'unique' },
  { name: 'card_unit_c6n_saiun', rarity: 'unique' },
  { name: 'card_event_hms_illustrious', rarity: 'unique' },
  { name: 'card_event_last_rites', rarity: 'unique' },
  { name: 'card_unit_m24_chaffee', rarity: 'unique' },
  { name: 'card_unit_p40_kittyhawk', rarity: 'unique' },
  { name: 'card_unit_panzer_iii_e', rarity: 'unique' },
  { name: 'card_unit_type_96_25mm_aa_gun', rarity: 'unique' },
  { name: 'card_event_ultra', rarity: 'unique' },
  { name: 'card_unit_101st_airborne', rarity: 'unique' },
  { name: 'card_unit_93rd_guards', rarity: 'unique' },
  { name: 'card_unit_b_26_marauder', rarity: 'unique' },
  { name: 'card_event_bombing_raid', rarity: 'unique' },
  { name: 'card_unit_6th_airborne', rarity: 'unique' },
  { name: 'card_unit_armored_train', rarity: 'unique' },
  { name: 'card_unit_jade_division', rarity: 'unique' },
  { name: 'card_event_admiral_hipper', rarity: 'unique' },
  { name: 'card_unit_m1_155mm_long_tom', rarity: 'unique' },
  { name: 'card_unit_british_sherman_firefly', rarity: 'unique' },
  { name: 'card_unit_shiden', rarity: 'unique' },
  { name: 'card_unit_sexton', rarity: 'unique' },
  { name: 'card_unit_comet1', rarity: 'unique' },
  { name: 'card_event_patriotic_war', rarity: 'unique' },
  { name: 'card_unit_comet', rarity: 'unique' },
  { name: 'card_unit_kv_1_1941', rarity: 'unique' },
  { name: 'card_unit_mosquito', rarity: 'unique' },
  { name: 'card_event_strategic_bombing', rarity: 'unique' },
  { name: 'card_unit_lancaster_biii', rarity: 'unique' },
  { name: 'card_event_home_defense', rarity: 'unique' },
  { name: 'card_unit_isu_152', rarity: 'unique' },
  { name: 'card_unit_me_262_schwalbe', rarity: 'unique' },
  { name: 'card_unit_panzerzug_6', rarity: 'unique' },
  { name: 'card_event_seaborne_invasion', rarity: 'unique' },
  { name: 'card_event_bismarck', rarity: 'unique' },
  { name: 'card_unit_railway_gun_leopold', rarity: 'unique' },
  { name: 'card_unit_m26_pershing', rarity: 'unique' },
  { name: 'card_event_the_commonwealth', rarity: 'unique' },

  // 在此添加更多卡牌...
  // 示例:
  // { name: "card_tactic_blitzkrieg", rarity: "uncommon" },
  // { name: "card_equipment_panzerschreck", rarity: "rare" },
  // { name: "card_unit_red_army_infantry", rarity: "common" },
];

const CARD_POOL_7: CardDefinition[] = [
  { name: 'card_unit_554th_rifles', rarity: 'common' },
  { name: 'card_event_unexpected_resistance', rarity: 'common' },
  { name: 'card_event_usace', rarity: 'common' },
  { name: 'card_event_war_production', rarity: 'common' },
  { name: 'card_unit_1st_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_321st_rifles', rarity: 'common' },
  { name: 'card_unit_4_pioneer', rarity: 'common' },
  { name: 'card_unit_463rd_battalion', rarity: 'common' },
  { name: 'card_unit_506th_airborne', rarity: 'common' },
  { name: 'card_unit_89th_infantry', rarity: 'common' },
  { name: 'card_event_aa_barrage', rarity: 'common' },
  { name: 'card_event_awoken_giant', rarity: 'common' },
  { name: 'card_event_blackout', rarity: 'common' },
  { name: 'card_event_bloody_sickle', rarity: 'common' },
  { name: 'card_event_burning_sky', rarity: 'common' },
  { name: 'card_event_careless_talk', rarity: 'common' },
  { name: 'card_event_close_air_support', rarity: 'common' },
  { name: 'card_event_combined_arms', rarity: 'common' },
  { name: 'card_event_cup_of_tea', rarity: 'common' },
  { name: 'card_event_deadly_duty', rarity: 'common' },
  { name: 'card_event_dive_bombing', rarity: 'common' },
  { name: 'card_event_final_push', rarity: 'common' },
  { name: 'card_unit_himeji_regiment', rarity: 'common' },
  { name: 'card_event_imperial_order', rarity: 'common' },
  { name: 'card_event_imperial_strength', rarity: 'common' },
  { name: 'card_event_interception', rarity: 'common' },
  { name: 'card_event_iron_from_the_north', rarity: 'common' },
  { name: 'card_event_land_of_the_free', rarity: 'common' },
  { name: 'card_unit_m8_greyhound', rarity: 'common' },
  { name: 'card_unit_model_25', rarity: 'common' },
  { name: 'card_event_naval_power', rarity: 'common' },
  { name: 'card_unit_pak_36', rarity: 'common' },
  { name: 'card_unit_panzer_ii_a', rarity: 'common' },
  { name: 'card_event_reserves', rarity: 'common' },
  { name: 'card_event_surprise_attack', rarity: 'common' },
  { name: 'card_event_tamanskya', rarity: 'common' },
  { name: 'card_unit_17th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_2_pounder', rarity: 'common' },
  { name: 'card_unit_flak_37_spg', rarity: 'common' },
  { name: 'card_unit_3rd_guards', rarity: 'common' },
  { name: 'card_unit_45mm_anti_tank_gun', rarity: 'common' },
  { name: 'card_unit_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_5th_brigade', rarity: 'common' },
  { name: 'card_unit_6th_infantry_regiment', rarity: 'common' },
  { name: 'card_unit_95th_rifles', rarity: 'common' },
  { name: 'card_unit_akita_regiment', rarity: 'common' },
  { name: 'card_event_ancient_empire', rarity: 'common' },
  { name: 'card_unit_bt_7', rarity: 'common' },
  { name: 'card_event_for_the_king', rarity: 'common' },
  { name: 'card_event_assault', rarity: 'common' },
  { name: 'card_unit_g4m1_betty', rarity: 'common' },
  { name: 'card_event_gunship', rarity: 'common' },
  { name: 'card_unit_i_16_ishak', rarity: 'common' },
  { name: 'card_event_national_fire_service', rarity: 'common' },
  { name: 'card_event_naval_support', rarity: 'common' },
  { name: 'card_unit_stug_III', rarity: 'common' },
  { name: 'card_event_supply_chain', rarity: 'common' },
  { name: 'card_event_supply_drop', rarity: 'common' },
  { name: 'card_event_supply_shipment', rarity: 'common' },
  { name: 'card_unit_t_70', rarity: 'common' },
  { name: 'card_unit_t19_howitzer', rarity: 'common' },
  { name: 'card_event_the_war_machine', rarity: 'common' },
  { name: 'card_event_tora_tora', rarity: 'common' },
  { name: 'card_unit_type_88_aa_gun', rarity: 'common' },
  { name: 'card_unit_type_95', rarity: 'common' },
  { name: 'card_event_ural_factories', rarity: 'common' },
  { name: 'card_unit_30th_regiment', rarity: 'common' },
  { name: 'card_unit_33_panzergrenadier', rarity: 'common' },
  { name: 'card_unit_6_pounder', rarity: 'common' },
  { name: 'card_unit_84th_infantry', rarity: 'common' },
  { name: 'card_unit_baluch_regiment', rarity: 'common' },
  { name: 'card_event_burning_sun', rarity: 'common' },
  { name: 'card_event_convoy_175', rarity: 'common' },
  { name: 'card_event_eagle_claws', rarity: 'common' },
  { name: 'card_unit_f4f_wildcat', rarity: 'common' },
  { name: 'card_event_fortification', rarity: 'common' },
  { name: 'card_event_from_the_people', rarity: 'common' },
  { name: 'card_event_honor', rarity: 'common' },
  { name: 'card_unit_hurricane', rarity: 'common' },
  { name: 'card_unit_m5a1_stuart_tut', rarity: 'common' },
  { name: 'card_unit_mito_regiment', rarity: 'common' },
  { name: 'card_event_naval_operation', rarity: 'common' },
  { name: 'card_unit_p40_warhawk', rarity: 'common' },
  { name: 'card_unit_pak_38_vs_2', rarity: 'common' },
  { name: 'card_unit_panzer_38_t', rarity: 'common' },
  { name: 'card_unit_qf_40mm_mk_iii', rarity: 'common' },
  { name: 'card_event_reichsbank', rarity: 'common' },
  { name: 'card_unit_su_76', rarity: 'common' },
  { name: 'card_unit_t_26', rarity: 'common' },
  { name: 'card_unit_25_pounder', rarity: 'common' },
  { name: 'card_unit_7th_regiment', rarity: 'common' },
  { name: 'card_unit_8th_cavalry_regiment', rarity: 'common' },
  { name: 'card_unit_a20_havoc', rarity: 'common' },
  { name: 'card_unit_jagdpanther', rarity: 'common' },
  { name: 'card_unit_ju_87_stuka', rarity: 'common' },
  { name: 'card_unit_hayabusa', rarity: 'common' },
  { name: 'card_unit_m4_sherman', rarity: 'common' },
  { name: 'card_event_uncle_sam', rarity: 'common' },
  { name: 'card_unit_10_5_cm_lefh', rarity: 'common' },
  { name: 'card_unit_zero', rarity: 'common' },
  { name: 'card_unit_churchill', rarity: 'common' },
  { name: 'card_unit_corsair_f4u', rarity: 'common' },
  { name: 'card_unit_j1n1_gekko', rarity: 'common' },
  { name: 'card_unit_ki_61_hien', rarity: 'common' },
  { name: 'card_event_overwhelming_force', rarity: 'common' },
  { name: 'card_unit_panzer_iv_g', rarity: 'common' },
  { name: 'card_unit_spitfire', rarity: 'common' },
  { name: 'card_unit_t_34', rarity: 'common' },
  { name: 'card_unit_t_34_85', rarity: 'common' },
  { name: 'card_unit_fw_190', rarity: 'common' },
  { name: 'card_unit_spitfire_v', rarity: 'common' },

  { name: 'card_unit_15th_cavalry_regiment', rarity: 'uncommon' },
  { name: 'card_unit_6th_naval_brigade', rarity: 'uncommon' },
  { name: 'card_event_air_superiority', rarity: 'uncommon' },
  { name: 'card_unit_gladiator', rarity: 'uncommon' },
  { name: 'card_unit_sd_kfz222x', rarity: 'uncommon' },
  { name: 'card_unit_swordfish', rarity: 'uncommon' },
  { name: 'card_event_tactical_withdrawal', rarity: 'uncommon' },
  { name: 'card_event_desert_rats', rarity: 'uncommon' },
  { name: 'card_unit_type_93', rarity: 'uncommon' },
  { name: 'card_event_winter_war', rarity: 'uncommon' },
  { name: 'card_unit_13th_rifle_regiment', rarity: 'uncommon' },
  { name: 'card_unit_3_fallschirmjager', rarity: 'uncommon' },
  { name: 'card_unit_a5m4_claude', rarity: 'uncommon' },
  { name: 'card_event_for_prosperety', rarity: 'uncommon' },
  { name: 'card_unit_katyusha', rarity: 'uncommon' },
  { name: 'card_unit_panzer_35_t', rarity: 'uncommon' },
  { name: 'card_event_scorched_earth', rarity: 'uncommon' },
  { name: 'card_event_sudden_strike', rarity: 'uncommon' },
  { name: 'card_unit_type_98_ke_ni', rarity: 'uncommon' },
  { name: 'card_event_u_375', rarity: 'uncommon' },
  { name: 'card_event_unity_is_strength', rarity: 'uncommon' },
  { name: 'card_unit_28cm_coasttal_howitzer', rarity: 'uncommon' },
  { name: 'card_unit_332nd_engineers', rarity: 'uncommon' },
  { name: 'card_unit_42nd_rifles', rarity: 'uncommon' },
  { name: 'card_unit_aichi_b7a2', rarity: 'uncommon' },
  { name: 'card_event_air_blitz', rarity: 'uncommon' },
  { name: 'card_event_amphibious_assault', rarity: 'uncommon' },
  { name: 'card_unit_argyllshire_highlanders', rarity: 'uncommon' },
  { name: 'card_event_blitzkrieg', rarity: 'uncommon' },
  { name: 'card_event_breakthrough', rarity: 'uncommon' },
  { name: 'card_unit_kumamoto_regiment', rarity: 'uncommon' },
  { name: 'card_unit_m16_halftrack', rarity: 'uncommon' },
  { name: 'card_unit_m7_priest', rarity: 'uncommon' },
  { name: 'card_unit_nebelwerfer', rarity: 'uncommon' },
  { name: 'card_event_reinforcements', rarity: 'uncommon' },
  { name: 'card_unit_sbd3_dauntless', rarity: 'uncommon' },
  { name: 'card_unit_stug_iv', rarity: 'uncommon' },
  { name: 'card_event_tactical_strike', rarity: 'uncommon' },
  { name: 'card_event_the_hammer', rarity: 'uncommon' },
  { name: 'card_unit_type_89', rarity: 'uncommon' },
  { name: 'card_unit_yak_3', rarity: 'uncommon' },
  { name: 'card_unit_1918_155mm', rarity: 'uncommon' },
  { name: 'card_unit_17_pounder', rarity: 'uncommon' },
  { name: 'card_unit_22nd_guards_brigade', rarity: 'uncommon' },
  { name: 'card_unit_75mm_field_artillery', rarity: 'uncommon' },
  { name: 'card_event_arctic_convoy', rarity: 'uncommon' },
  { name: 'card_unit_nakajima_b5n', rarity: 'uncommon' },
  { name: 'card_unit_skua_mk_ii', rarity: 'uncommon' },
  { name: 'card_event_critical_hit', rarity: 'uncommon' },
  { name: 'card_event_death_from_above', rarity: 'uncommon' },
  { name: 'card_unit_sally', rarity: 'uncommon' },
  { name: 'card_unit_ki_44_tojo', rarity: 'uncommon' },
  { name: 'card_unit_me_bf_110', rarity: 'uncommon' },
  { name: 'card_event_naval_bombardment_cam1', rarity: 'uncommon' },
  { name: 'card_unit_p38_lightning', rarity: 'uncommon' },
  { name: 'card_unit_panzer_iii_j', rarity: 'uncommon' },
  { name: 'card_event_for_precision_bombing', rarity: 'uncommon' },
  { name: 'card_event_red_october', rarity: 'uncommon' },
  { name: 'card_unit_royal_west_kents', rarity: 'uncommon' },
  { name: 'card_event_sky_barons', rarity: 'uncommon' },
  { name: 'card_unit_su_152', rarity: 'uncommon' },
  { name: 'card_event_blockade', rarity: 'uncommon' },
  { name: 'card_unit_hampden', rarity: 'uncommon' },
  { name: 'card_unit_ki_84_frank', rarity: 'uncommon' },
  { name: 'card_event_no_surrender', rarity: 'uncommon' },
  { name: 'card_unit_type_3_chi_nu', rarity: 'uncommon' },
  { name: 'card_event_war_bonds', rarity: 'uncommon' },
  { name: 'card_event_we_can_do_it', rarity: 'uncommon' },
  { name: 'card_unit_88_mm_flak', rarity: 'uncommon' },
  { name: 'card_unit_a_24_banshee', rarity: 'uncommon' },
  { name: 'card_unit_b_25_mitchell', rarity: 'uncommon' },
  { name: 'card_unit_p51_mustang', rarity: 'uncommon' },
  { name: 'card_unit_p1y_ginga', rarity: 'uncommon' },
  { name: 'card_unit_panzer_iv_f2', rarity: 'uncommon' },
  { name: 'card_unit_756th_regiment', rarity: 'uncommon' },
  { name: 'card_unit_coastal_gun', rarity: 'uncommon' },
  { name: 'card_unit_b_24', rarity: 'uncommon' },
  { name: 'card_unit_lancaster', rarity: 'uncommon' },

  { name: 'card_unit_10th_engineering_battalion', rarity: 'rare' },
  { name: 'card_unit_16th_rifles', rarity: 'rare' },
  { name: 'card_unit_33rd_recon', rarity: 'rare' },
  { name: 'card_unit_41st_bicycle_regiment', rarity: 'rare' },
  { name: 'card_unit_arado_ar_196', rarity: 'rare' },
  { name: 'card_event_burst_of_fire', rarity: 'rare' },
  { name: 'card_event_enemy_spotted', rarity: 'rare' },
  { name: 'card_event_for_freedom', rarity: 'rare' },
  { name: 'card_event_for_the_emperor', rarity: 'rare' },
  { name: 'card_event_in_the_navy', rarity: 'rare' },
  { name: 'card_unit_22_infantry', rarity: 'rare' },
  { name: 'card_unit_75mm_mountain_gun', rarity: 'rare' },
  { name: 'card_unit_99th_infantry', rarity: 'rare' },
  { name: 'card_unit_albacore', rarity: 'rare' },
  { name: 'card_event_blood_red_sky', rarity: 'rare' },
  { name: 'card_event_close_combat', rarity: 'rare' },
  { name: 'card_event_finest_hour', rarity: 'rare' },
  { name: 'card_unit_henschel_hs_123', rarity: 'rare' },
  { name: 'card_unit_i_15_chaika', rarity: 'rare' },
  { name: 'card_event_industrial_might', rarity: 'rare' },
  { name: 'card_unit_ki_27_nate', rarity: 'rare' },
  { name: 'card_event_missing', rarity: 'rare' },
  { name: 'card_event_mobilization', rarity: 'rare' },
  { name: 'card_event_order_no_227', rarity: 'rare' },
  { name: 'card_event_radar_alert', rarity: 'rare' },
  { name: 'card_unit_wirbelwind', rarity: 'rare' },
  { name: 'card_unit_35th_rifles', rarity: 'rare' },
  { name: 'card_unit_76mm_howitzer_1939', rarity: 'rare' },
  { name: 'card_unit_aichi_d3a', rarity: 'rare' },
  { name: 'card_event_airstrike_new', rarity: 'rare' },
  { name: 'card_event_atlantic_convoy', rarity: 'rare' },
  { name: 'card_event_code_of_bushido', rarity: 'rare' },
  { name: 'card_unit_crusader_mk_ii', rarity: 'rare' },
  { name: 'card_event_divine_wind', rarity: 'rare' },
  { name: 'card_event_encirclement', rarity: 'rare' },
  { name: 'card_unit_m18_hellcat', rarity: 'rare' },
  { name: 'card_unit_marder_iii_h', rarity: 'rare' },
  { name: 'card_event_mi_5', rarity: 'rare' },
  { name: 'card_event_naval_supply_run', rarity: 'rare' },
  { name: 'card_unit_petlyakov_pe_2', rarity: 'rare' },
  { name: 'card_event_torpedo_attack', rarity: 'rare' },
  { name: 'card_event_cadet_nurse_corps', rarity: 'rare' },
  { name: 'card_event_daylight_bombing', rarity: 'rare' },
  { name: 'card_event_enigma', rarity: 'rare' },
  { name: 'card_unit_hudson', rarity: 'rare' },
  { name: 'card_event_mass_attack', rarity: 'rare' },
  { name: 'card_event_mother_russia', rarity: 'rare' },
  { name: 'card_event_night_raid', rarity: 'rare' },
  { name: 'card_event_rescue_mission', rarity: 'rare' },
  { name: 'card_unit_sendai_regiment', rarity: 'rare' },
  { name: 'card_event_the_empire', rarity: 'rare' },
  { name: 'card_event_wolfpack', rarity: 'rare' },
  { name: 'card_unit_b4_203mm_howitzer', rarity: 'rare' },
  { name: 'card_unit_black_watch', rarity: 'rare' },
  { name: 'card_unit_p47d_thunderbolt', rarity: 'rare' },
  { name: 'card_unit_panther', rarity: 'rare' },
  { name: 'card_unit_p38_lightning_raf', rarity: 'rare' },
  { name: 'card_event_the_alliance', rarity: 'rare' },
  { name: 'card_unit_yak_9', rarity: 'rare' },
  { name: 'card_unit_85mm_d44', rarity: 'rare' },
  { name: 'card_event_blade_of_the_samurai', rarity: 'rare' },
  { name: 'card_unit_corsair_f4u_1d', rarity: 'rare' },
  { name: 'card_unit_dornier_do_217', rarity: 'rare' },
  { name: 'card_unit_grenadier_guards', rarity: 'rare' },
  { name: 'card_unit_kv_1', rarity: 'rare' },
  { name: 'card_unit_stirling', rarity: 'rare' },
  { name: 'card_event_annihilation', rarity: 'rare' },
  { name: 'card_event_carpet_bombing', rarity: 'rare' },
  { name: 'card_unit_junkers_ju_188', rarity: 'rare' },
  { name: 'card_event_patriotic_zeal', rarity: 'rare' },
  { name: 'card_unit_tbf_avanger', rarity: 'rare' },
  { name: 'card_unit_tiger_i', rarity: 'rare' },
  { name: 'card_unit_b_17', rarity: 'rare' },
  { name: 'card_event_empire_of_the_sun', rarity: 'rare' },

  { name: 'card_unit_158_nachschub', rarity: 'unique' },
  { name: 'card_unit_1st_signal_regiment', rarity: 'unique' },
  { name: 'card_unit_85_pioneer_company', rarity: 'unique' },
  { name: 'card_event_yamamoto', rarity: 'unique' },
  { name: 'card_event_fast_heinz', rarity: 'unique' },
  { name: 'card_event_monty', rarity: 'unique' },
  { name: 'card_event_patton', rarity: 'unique' },
  { name: 'card_event_zhukov', rarity: 'unique' },
  { name: 'card_event_air_defense', rarity: 'unique' },
  { name: 'card_unit_pete', rarity: 'unique' },
  { name: 'card_unit_grumman_hellcat2', rarity: 'unique' },
  { name: 'card_event_from_the_deep', rarity: 'unique' },
  { name: 'card_event_lightning_conquest_new', rarity: 'unique' },
  { name: 'card_event_red_banner', rarity: 'unique' },
  { name: 'card_event_siberian_transfer', rarity: 'unique' },
  { name: 'card_unit_15_cm_autokanone', rarity: 'unique' },
  { name: 'card_unit_1st_airlanding_brigade', rarity: 'unique' },
  { name: 'card_unit_2nd_raiding_brigade', rarity: 'unique' },
  { name: 'card_unit_cossack_cavalry', rarity: 'unique' },
  { name: 'card_unit_c6n_saiun', rarity: 'unique' },
  { name: 'card_event_hms_illustrious', rarity: 'unique' },
  { name: 'card_event_last_rites', rarity: 'unique' },
  { name: 'card_unit_m24_chaffee', rarity: 'unique' },
  { name: 'card_unit_p40_kittyhawk', rarity: 'unique' },
  { name: 'card_unit_panzer_iii_e', rarity: 'unique' },
  { name: 'card_unit_type_96_25mm_aa_gun', rarity: 'unique' },
  { name: 'card_event_ultra', rarity: 'unique' },
  { name: 'card_unit_101st_airborne', rarity: 'unique' },
  { name: 'card_unit_93rd_guards', rarity: 'unique' },
  { name: 'card_unit_b_26_marauder', rarity: 'unique' },
  { name: 'card_event_bombing_raid', rarity: 'unique' },
  { name: 'card_unit_6th_airborne', rarity: 'unique' },
  { name: 'card_unit_armored_train', rarity: 'unique' },
  { name: 'card_unit_jade_division', rarity: 'unique' },
  { name: 'card_event_admiral_hipper', rarity: 'unique' },
  { name: 'card_unit_m1_155mm_long_tom', rarity: 'unique' },
  { name: 'card_unit_british_sherman_firefly', rarity: 'unique' },
  { name: 'card_unit_shiden', rarity: 'unique' },
  { name: 'card_unit_sexton', rarity: 'unique' },
  { name: 'card_unit_comet1', rarity: 'unique' },
  { name: 'card_event_patriotic_war', rarity: 'unique' },
  { name: 'card_unit_comet', rarity: 'unique' },
  { name: 'card_unit_kv_1_1941', rarity: 'unique' },
  { name: 'card_unit_mosquito', rarity: 'unique' },
  { name: 'card_event_strategic_bombing', rarity: 'unique' },
  { name: 'card_unit_lancaster_biii', rarity: 'unique' },
  { name: 'card_event_home_defense', rarity: 'unique' },
  { name: 'card_unit_isu_152', rarity: 'unique' },
  { name: 'card_unit_me_262_schwalbe', rarity: 'unique' },
  { name: 'card_unit_panzerzug_6', rarity: 'unique' },
  { name: 'card_event_seaborne_invasion', rarity: 'unique' },
  { name: 'card_event_bismarck', rarity: 'unique' },
  { name: 'card_unit_railway_gun_leopold', rarity: 'unique' },
  { name: 'card_unit_m26_pershing', rarity: 'unique' },
  { name: 'card_event_the_commonwealth', rarity: 'unique' },
];

const CARD_POOL_MAP: Record<number, CardDefinition[]> = {
  1: CARD_POOL,
  2: CARD_POOL_7,
  3: Allegiance_Pack,
  4: Allegiance_Pack_7,
  5: BrothersInArms_Pack,
  6: BrothersInArms_Pack_7,
  // 未来添加新卡包示例：
  // 4: CARD_POOL_4,
};

// 稀有度概率分布
const RARITY_PROBABILITIES = {
  common: 0.7,
  uncommon: 0.21,
  rare: 0.06,
  unique: 0.03,
};

// 闪卡概率
const GOLD_CARD_PROBABILITY = 0.08;

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getConfig(@Headers('Authorization') auth: string): object {
    return this.appService.getConfig(auth);
  }

  @Put('/players/:player_id/packs')
  async putPack(
    @Body() body: { id: number },
    @Param('player_id') player_id: string,
    @Headers('Authorization') auth: string,
  ) {
    // 获取用户数据
    const user: User = JSON.parse(await users.get(player_id));
    // 删除对应id的卡包
    if (user.packs && user.packs.length > 0) {
      const idx = user.packs.findIndex((pack) => pack.id === body.id);
      if (idx !== -1) {
        user.packs.splice(idx, 1);
        User.prototype.store.call(user);
      }
    }

    const cards: {
      card_name: string;
      dust: number;
      is_gold_card: boolean;
      new_card: boolean;
      recycled: boolean;
    }[] = [];

    const packId = body.id;
    const isPremiumPack = packId === 2 || packId === 4 || packId === 6;
    const totalCards = isPremiumPack ? 7 : 5;
    const cardPool = CARD_POOL_MAP[packId] || CARD_POOL;

    const adjustedProbabilities = isPremiumPack
      ? {
          common: 0.55,
          uncommon: 0.3,
          rare: 0.1,
          unique: 0.05,
        }
      : RARITY_PROBABILITIES;

    const generatedUniqueCards: Set<string> = new Set();
    const generatedRareCards: Set<string> = new Set();

    const minRarity = isPremiumPack ? 'rare' : 'uncommon';
    const minRarityCandidates = cardPool.filter((card) => {
      if (isPremiumPack) {
        return card.rarity === 'rare' || card.rarity === 'unique';
      } else {
        return card.rarity === 'uncommon';
      }
    });

    if (minRarityCandidates.length > 0) {
      let selectedCard: CardDefinition;
      if (!isPremiumPack && Math.random() < 0.04) {
        const rareCandidates = minRarityCandidates.filter(
          (c) => c.rarity === 'rare',
        );
        if (rareCandidates.length > 0) {
          selectedCard = this.selectUniqueCard(
            rareCandidates,
            generatedRareCards,
            generatedUniqueCards,
          );
        } else {
          const uncommonCandidates = minRarityCandidates.filter(
            (c) => c.rarity === 'uncommon',
          );
          selectedCard = this.selectCardWithoutDuplicates(uncommonCandidates);
        }
      } else {
        selectedCard = this.selectCardWithRarityConstraints(
          minRarityCandidates,
          generatedUniqueCards,
          generatedRareCards,
        );
      }

      const isGoldCard = Math.random() < GOLD_CARD_PROBABILITY;
      cards.push(this.createCard(selectedCard, isGoldCard));
    }

    for (let i = cards.length; i < totalCards; i++) {
      const rarityRoll = Math.random();
      let selectedRarity: keyof typeof RARITY_PROBABILITIES = 'common';
      let cumulativeProbability = 0;

      for (const [rarity, probability] of Object.entries(
        adjustedProbabilities,
      )) {
        cumulativeProbability += probability;
        if (rarityRoll <= cumulativeProbability) {
          selectedRarity = rarity as keyof typeof RARITY_PROBABILITIES;
          break;
        }
      }

      let candidates = cardPool.filter(
        (card) => card.rarity === selectedRarity,
      );
      let selectedCard: CardDefinition;

      if (selectedRarity === 'unique') {
        candidates = candidates.filter(
          (card) => !generatedUniqueCards.has(card.name),
        );
        selectedCard =
          candidates[Math.floor(Math.random() * candidates.length)];
        generatedUniqueCards.add(selectedCard.name);
      } else if (selectedRarity === 'rare') {
        candidates = candidates.filter(
          (card) => !generatedRareCards.has(card.name),
        );
        selectedCard =
          candidates[Math.floor(Math.random() * candidates.length)];
        generatedRareCards.add(selectedCard.name);
      } else {
        selectedCard =
          candidates[Math.floor(Math.random() * candidates.length)];
      }

      const isGoldCard = Math.random() < GOLD_CARD_PROBABILITY;
      cards.push(this.createCard(selectedCard, isGoldCard));
    }

    return {
      cards,
      total_dust: 15,
    };
  }

  private createCard(card: CardDefinition, isGold: boolean) {
    return {
      card_name: card.name,
      dust: 0,
      is_gold_card: isGold,
      new_card: true,
      recycled: false,
    };
  }

  private selectCardWithRarityConstraints(
    candidates: CardDefinition[],
    uniqueSet: Set<string>,
    rareSet: Set<string>,
  ): CardDefinition {
    const filteredCandidates = candidates.filter((card) => {
      if (card.rarity === 'unique') {
        return !uniqueSet.has(card.name);
      } else if (card.rarity === 'rare') {
        return !rareSet.has(card.name);
      }
      return true;
    });

    const selectedCard =
      filteredCandidates[Math.floor(Math.random() * filteredCandidates.length)];

    if (selectedCard.rarity === 'unique') {
      uniqueSet.add(selectedCard.name);
    } else if (selectedCard.rarity === 'rare') {
      rareSet.add(selectedCard.name);
    }

    return selectedCard;
  }

  private selectUniqueCard(
    candidates: CardDefinition[],
    rareSet: Set<string>,
    uniqueSet: Set<string>,
  ): CardDefinition {
    const filteredCandidates = candidates.filter((card) =>
      card.rarity === 'rare'
        ? !rareSet.has(card.name)
        : !uniqueSet.has(card.name),
    );

    const selectedCard =
      filteredCandidates[Math.floor(Math.random() * filteredCandidates.length)];

    if (selectedCard.rarity === 'unique') {
      uniqueSet.add(selectedCard.name);
    } else if (selectedCard.rarity === 'rare') {
      rareSet.add(selectedCard.name);
    }

    return selectedCard;
  }

  private selectCardWithoutDuplicates(
    candidates: CardDefinition[],
  ): CardDefinition {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  @Get('items/:id')
  async getItems(@Headers('Authorization') auth: string) {
    return this.appService.getItems(JSON.parse(await users.get(auth.slice(8))));
  }

  @Post('items/:id')
  async equipItem(@Headers('Authorization') auth: string, @Body() body) {
    this.appService.equipItem(JSON.parse(await users.get(auth.slice(8))), body);
    return body;
  }

  @Get('/players/:id/packs')
  async getPlayerPacks(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ): Promise<any[]> {
    const user: User = JSON.parse(await users.get(id));
    return user.packs || [];
  }

  @Post('//players/:player_id/friends')
  async setName(@Body() body, @Headers('Authorization') auth: string) {
    const user: User = JSON.parse(await users.get(auth.slice(8)));
    if (body.friend_tag == 0) {
      user.name = body.friend_name;
      User.prototype.store.call(user);
    }
    return 'OK';
  }

  @Get('getonline')
  getOnline() {
    return Object.values(clients).map((c) => c.user);
  }

  @Post('/store/v2/txn')
  async buyOffer(
    @Body() body,
    @Headers('Authorization') auth: string,
    @Res() res,
  ) {
    const user: User = JSON.parse(await users.get(auth.slice(8)));
    if (body.groupId === 73) {
      const pack = {
        card_set: '5|Core',
        create_date: '2025-08-23T03:39:05.333305Z',
        date_opened: null,
        details: null,
        id: 1,
        modify_date: '2025-08-23T03:39:05.333305Z',
        player_id: user.id,
      };
      user.packs = user.packs || [];
      user.packs.push(pack);
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 1,
        receiptId: 138930530,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 5,
                  cardSet: 'Core',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: [116751127],
                },
                qty: 1,
              },
            ],
            offerName: 'offer_1_core_pack',
            receiptId: 138930530,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    if (body.groupId === 86) {
      const pack = {
        card_set: '7|Core',
        create_date: '2025-08-23T03:39:05.333305Z',
        date_opened: null,
        details: null,
        id: 2,
        modify_date: '2025-08-23T03:39:05.333305Z',
        player_id: user.id,
      };
      user.packs = user.packs || [];
      user.packs.push(pack);
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 1,
        receiptId: 138930530,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'Core',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: [116751127],
                },
                qty: 1,
              },
            ],
            offerName: 'offer_1_core_pack',
            receiptId: 138930530,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    if (body.groupId === 2216) {
      const pack = {
        card_set: '5|BrothersInArms',
        create_date: '2025-08-23T03:39:05.333305Z',
        date_opened: null,
        details: null,
        id: 5,
        modify_date: '2025-08-23T03:39:05.333305Z',
        player_id: user.id,
      };
      user.packs = user.packs || [];
      user.packs.push(pack);
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 1,
        receiptId: 138930530,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 5,
                  cardSet: 'BrothersInArms',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: [116751127],
                },
                qty: 1,
              },
            ],
            offerName: 'offer_1_core_pack',
            receiptId: 138930530,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    if (body.groupId === 2219) {
      const pack = {
        card_set: '7|BrothersInArms',
        create_date: '2025-08-23T03:39:05.333305Z',
        date_opened: null,
        details: null,
        id: 6,
        modify_date: '2025-08-23T03:39:05.333305Z',
        player_id: user.id,
      };
      user.packs = user.packs || [];
      user.packs.push(pack);
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 1,
        receiptId: 138930530,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'BrothersInArms',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: [116751127],
                },
                qty: 1,
              },
            ],
            offerName: 'offer_1_core_pack',
            receiptId: 138930530,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    if (body.groupId === 2417) {
      user.packs = user.packs || [];
      for (let i = 0; i < 36; i++) {
        user.packs.push({
          card_set: '7|Core',
          create_date: new Date().toISOString(),
          date_opened: null,
          details: null,
          id: 2,
          modify_date: new Date().toISOString(),
          player_id: user.id,
        });
      }
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 36,
        receiptId: 24170001,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'Core',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: Array(36).fill(2),
                },
                qty: 36,
              },
            ],
            offerName: 'offer_buy_30_officer_packs_-_get_6_free',
            receiptId: 24170001,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    if (body.groupId === -1) {
      user.packs = user.packs || [];
      for (let i = 0; i < 36; i++) {
        user.packs.push({
          card_set: '7|BrothersInArms',
          create_date: new Date().toISOString(),
          date_opened: null,
          details: null,
          id: 6,
          modify_date: new Date().toISOString(),
          player_id: user.id,
        });
      }
      User.prototype.store.call(user);

      const responseBody = {
        message: 'OK',
        newDiamonds: 99999,
        purchasedCount: 30,
        receiptId: 24170001,
        receipts: [
          {
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'brothersInArms',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                  packIds: Array(36).fill(2),
                },
                qty: 30,
              },
            ],
            offerName: 'offer_30_officer_packs_-_naval_warfare_live',
            receiptId: 24170001,
          },
        ],
        status: 200,
      };
      return res.status(200).json(responseBody);
    }

    return res
      .status(400)
      .json({ message: 'Unsupported groupId', status: 400 });
  }

  @Get('//store/v2')
  getStorev2() {
    return {
      alwaysFeatured: {
        endDate: '2099-01-01T00:00:00Z',
        group: 1,
        groupId: -1,
        offers: [
          {
            description: '别管为什么图片是海战，因为我找不到战友包的图。',
            diamonds: 1200,
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'BrothersInArms',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                },
                qty: 30,
              },
            ],
            limit: 10,
            mainImage:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_30_officer_packs___naval_warfare_live/navalwarfare_30_officer_1280x720.jpg',
            offerId: 6796213,
            offerName: 'offer_30_officer_packs_-_naval_warfare_live',
            priority: 5,
            thumbnail:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_30_officer_packs___naval_warfare_live/navalwarfare_30_officer_1280x720.jpg',
            title: '30 个军官卡包 - 战友',
          },
          {
            description:
              '每个卡包内含：\n•7张核心卡牌\n•至少2张限定或更高等级的卡牌\n•至少1张特殊或精英卡牌\n•可能掉落万能牌和闪卡\n\n核心卡包包含您开始建立收藏所需的全部卡牌。其包含的卡牌来自所有主国（德国，英国，苏联，美国和日本）与以下盟国：法国，意大利和波兰。',
            diamonds: 1200,
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'Core',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                },
                qty: 30,
              },
            ],
            mainImage:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_30_core_officer_packs_backup_offer/30_corepacks-officer_shop.jpg',
            offerId: 6777130,
            offerName: 'offer_30_core_officer_packs_backup_offer',
            priority: 7,
            thumbnail:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_30_core_officer_packs_backup_offer/30_corepacks-officer_shop.jpg',
            title: '30个军官卡包 - 核心套装',
          },
          {
            description:
              '每个卡包内含：\n• 7 张海战卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 有几率掉落万能牌和闪卡\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
            diamonds: 850,
            items: [
              {
                data: {
                  cardCount: 7,
                  cardSet: 'NavalWarfare',
                  guaranteedGoldCards: 0,
                  itemType: 'pack',
                },
                qty: 20,
              },
            ],
            limit: 0,
            mainImage:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_20_officer_packs___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
            offerId: 6798220,
            offerName: 'offer_20_officer_packs_-_naval_warfare',
            priority: 8,
            thumbnail:
              'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_20_officer_packs___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
            title: '20 个军官卡包 - 海战',
          },
        ],
        startDate: '2018-01-01T00:00:00Z',
      },
      currency: 'USD',
      groups: [
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 27,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 10,
                },
              ],
              description: '钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 48,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_s/diamond_bundle1_parcel_productimage02.jpg',
              offerId: 16566,
              offerName: 'diamonds_s',
              real: 4.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle1_parcel_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_s/diamond_bundle1_parcel_thumb02.jpg',
              title: '48钻石',
            },
          ],
          startDate: '2023-04-19T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 73,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张核心卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。',
              diamonds: 14,
              gold: 100,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_1_core_pack/core_packs_1_lowres2.jpg',
              offerId: 16569,
              offerName: 'offer_1_core_pack',
              slotType: 'most_popular',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_1_core_pack/core_packs_1.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_1_core_pack/core_packs_officer_20_lowres2.jpg',
              title: '1个卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 74,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 30,
                },
              ],
              description:
                '一盒钻石内含100颗钻石。钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 100,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_m/diamond_bundle2_matchbox_productimage02.jpg',
              offerId: 16928,
              offerName: 'diamonds_m',
              real: 9.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle2_matchbox_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_m/diamond_bundle2_matchbox_thumb02.jpg',
              title: '100钻石',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 75,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 75,
                },
              ],
              description:
                '一包钻石内含210颗钻石。钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 210,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_l/diamond_bundle3_leatherbag_productimage02.jpg',
              offerId: 16929,
              offerName: 'diamonds_l',
              real: 19.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle3_leatherBag_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_l/diamond_bundle3_leatherbag_thumb02.jpg',
              title: '210钻石',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 76,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 155,
                },
              ],
              description:
                '一杯钻石具有优惠，内含380颗钻石。钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 380,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xl/diamond_bundle4_cup_productimage02.jpg',
              offerId: 16930,
              offerName: 'diamonds_xl',
              real: 34.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle4_Cup_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xl/diamond_bundle4_cup_thumb02.jpg',
              title: '380钻石',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 77,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 260,
                },
              ],
              description:
                '一帽钻石非常合算，内含570颗钻石。钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 570,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xxl/diamond_bundle5_helmet_productimage02.jpg',
              offerId: 16931,
              offerName: 'diamonds_xxl',
              real: 49.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle5_helmet_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xxl/diamond_bundle5_helmet_thumb02.jpg',
              title: '570钻石',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 5,
          groupId: 78,
          offers: [
            {
              bonusItems: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 600,
                },
              ],
              description:
                '一箱钻石具有大幅优惠，内含1200颗钻石。钻石可以用于在商店中购买卡包、捆绑包特惠和装备。',
              items: [
                {
                  data: {
                    itemType: 'diamonds',
                  },
                  qty: 1200,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xxxl/diamond_bundle6_chest_productimage02.jpg',
              offerId: 16932,
              offerName: 'diamonds_xxxl',
              real: 99.99,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/ShopAssetsPlusThumbs/Diamond_offers_10_03_2022/diamond_bundle6_chest_thumb.png',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/diamonds_xxxl/diamond_bundle6_chest_thumb02.jpg',
              title: '1200钻石',
            },
          ],
          startDate: '2023-05-06T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 80,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张核心卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。',
              diamonds: 98,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 7,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_packs/core_packs_7_lowres2.jpg',
              offerId: 16962,
              offerName: 'packs_7_packs',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_packs/core_packs_7.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_packs/core_packs_7_lowres2.jpg',
              title: '7个卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-08T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 86,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张核心卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 可能掉落万能牌和闪卡\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。军官卡包内含更多卡牌和更高稀有度的卡牌。',
              diamonds: 43,
              gold: 330,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_officer_pack___core/core_packs_officer_1_lowres2.jpg',
              offerId: 16974,
              offerName: 'packs_1_officer_pack_-_core',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_officer_pack_-_core/core_packs_officer_1.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_officer_pack___core/core_packs_officer_1_lowres2.jpg',
              title: '1个军官卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-09T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 90,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张核心卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 可能掉落万能牌和闪卡\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。军官卡包内含更多卡牌和更高稀有度的卡牌。',
              diamonds: 850,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 20,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_officer_packs___core/core_packs_officer_20_full_image_lowres.jpg',
              offerId: 16975,
              offerName: 'packs_20_officer_packs_-_core',
              priority: 1002,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_officer_packs_-_core/core_packs_officer_20_v2.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_officer_packs___core/core_packs_officer_20_lowres2.jpg',
              title: '20个军官卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-09T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 91,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张核心卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 可能掉落万能牌和闪卡\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。军官卡包内含更多卡牌和更高稀有度的卡牌。',
              diamonds: 300,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 7,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_officer_packs___core/core_packs_officer_7_lowres2.jpg',
              offerId: 16973,
              offerName: 'packs_7_officer_packs_-_core',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_officer_packs_-_core/core_packs_officer_7.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_officer_packs___core/core_packs_officer_7_lowres2.jpg',
              title: '7个军官卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-09T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 92,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张核心卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n核心卡包包含您起步所需的全部卡牌。核心卡池收录了所有主国（德国、英国、苏联、美国和日本）以及所有盟国（法国、意大利、波兰和芬兰）的卡牌。',
              diamonds: 280,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 20,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_packs___core/core_packs_20_lowres2.jpg',
              offerId: 16971,
              offerName: 'packs_20_packs_-_core',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_packs_-_core/core_packs_20.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_packs___core/core_packs_20_lowres2.jpg',
              title: '20个卡包 - 核心套装',
            },
          ],
          startDate: '2023-05-09T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 1,
          groupId: 157,
          offers: [],
          startDate: '2023-06-08T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 11,
          groupId: 1198,
          hidden: true,
          offers: [
            {
              description:
                '战区引入了五个单人 PVE 战役，在不同的历史场景中进行，你将在危机四伏的环境中接受特殊的任务目标，不断挑战技能和决心。战区包括以下 5 个历史战役：莫斯科保卫战（苏联）、第二次阿拉曼战役（德国）、菲律宾战役（日本）、瓜达尔卡纳尔岛战役（美国）和突尼斯战役（英国）。\n\n完成战役以获得战区国家卡背，每个国家一张。在战役中获得满星，可为每个国家解锁一个特殊表情。',
              diamonds: 148,
              items: [
                {
                  data: {
                    itemType: 'campaign',
                    name: 'campaign_britain1',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'campaign',
                    name: 'campaign_germany1',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'campaign',
                    name: 'campaign_soviet1',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'campaign',
                    name: 'campaign_japan1',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'campaign',
                    name: 'campaign_us1',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/campaigns_theaters_of_war/store-tow_campaign_thumbcn.jpg',
              offerId: 6757643,
              offerName: 'campaigns_theaters_of_war',
              priority: 50,
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/campaigns_theaters_of_war/store-tow_campaign_thumbcn.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/campaigns_theaters_of_war/store-tow_campaign_thumbcn.jpg',
              title: '战区',
            },
          ],
          startDate: '2024-08-28T10:54:00Z',
        },
        {
          endDate: '2030-03-12T11:00:00Z',
          group: 1,
          groupId: 1796,
          offers: [],
          startDate: '2025-03-12T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 7,
          groupId: 1814,
          offers: [
            {
              description: 'Battle Pass 3 Months',
              items: [
                {
                  data: {
                    itemType: 'token',
                    name: 'token_3_month_pass',
                  },
                  qty: 1,
                },
              ],
              offerId: 6789284,
              offerName: 'multiple_battle_passes_-_3_months',
              real: 31.99,
              title: 'Battle Pass 3 Months',
            },
          ],
          startDate: '2025-03-20T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 7,
          groupId: 1815,
          offers: [
            {
              description: 'Battle Pass 6 Months',
              items: [
                {
                  data: {
                    itemType: 'token',
                    name: 'token_6_month_pass',
                  },
                  qty: 1,
                },
              ],
              offerId: 6789285,
              offerName: 'multiple_battle_passes_-_6_months',
              real: 59.99,
              title: 'Battle Pass 6 Months',
            },
          ],
          startDate: '2025-03-20T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2219,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张海战卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 有几率掉落万能牌和闪卡\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 43,
              gold: 330,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_officer_pack___naval_warfare/navalwarfare_1_officer_1280x720.jpg',
              offerId: 6796209,
              offerName: 'packs_1_officer_pack_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_officer_pack___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
              title: '1 个军官卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2221,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张海战卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 有几率掉落万能牌和闪卡\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 850,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 20,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_officer_packs___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
              offerId: 6796211,
              offerName: 'packs_20_officer_packs_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_officer_packs___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
              title: '20 个军官卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2216,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张海战卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 14,
              gold: 100,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_pack___naval_warfare/navalwarfare_1_regular_1280x720.jpg',
              offerId: 6796206,
              offerName: 'packs_1_pack_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_1_pack___naval_warfare/navalwarfare_20_officer_1280x720.jpg',
              title: '1 个卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2217,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张海战卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 98,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 7,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_packs___naval_warfare/navalwarfare_7_regular_1280x720.jpg',
              offerId: 6796207,
              offerName: 'packs_7_packs_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_packs___naval_warfare/navalwarfare_7_regular_1280x720.jpg',
              title: '7 个卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2218,
          offers: [
            {
              description:
                '每个卡包内含：\n• 5 张海战卡牌\n• 至少 1 张限定或更高稀有度卡牌\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 280,
              items: [
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 20,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_packs___naval_warfare/navalwarfare_20_regular_1280x720.jpg',
              offerId: 6796208,
              offerName: 'packs_20_packs_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_20_packs___naval_warfare/navalwarfare_20_regular_1280x720.jpg',
              title: '20 个卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 4,
          groupId: 2220,
          offers: [
            {
              description:
                '每个卡包内含：\n• 7 张海战卡牌\n• 至少 2 张限定或更高稀有度卡牌\n• 至少 1 张特殊或精英卡牌\n• 有几率掉落万能牌和闪卡\n\n海战，KARDS 第 9 个大型扩展包，引入了 87 张全新卡牌以及来自预备卡池的一系列回归卡牌。本次扩展包深入海上冲突的核心，将史诗级的海战与军舰推向舞台中心。海战首次推出海军子类型以及创新转换机制，开辟新的战术选择与强力组合。迎接 KARDS 历史上最为刺激、最具深度的新篇章，统领大海！',
              diamonds: 300,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 7,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_officer_packs___naval_warfare/navalwarfare_7_officer_1280x720.jpg',
              offerId: 6796210,
              offerName: 'packs_7_officer_packs_-_naval_warfare',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/packs_7_officer_packs___naval_warfare/navalwarfare_7_officer_1280x720.jpg',
              title: '7 个军官卡包 - 海战',
            },
          ],
          startDate: '2025-06-18T11:00:00Z',
        },
        {
          endDate: '2025-09-01T00:00:00Z',
          group: 6,
          groupId: 1801,
          offers: [
            {
              description:
                '战场通票将带来高达 6 倍的收益，提供游戏加成、额外奖励以及专属饰品（一年内不会上架商店）。\n以下是战场通票饰品各自适用的国家：\n玩家头像 - 任何国家\n卡背 - 英国\n表情 - 任何国家\n异画 - 美国\n此通票有效期至 2025 年 8 月 31 日。',
              fulfilAfter: '2025-08-01T00:00:00Z',
              items: [
                {
                  data: {
                    itemType: 'bp',
                    month: 8,
                    year: 2025,
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'avatar',
                    name: 'avatar_paratrooper',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'cardback',
                    name: 'cardback_27th_armored_brigade',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'emote',
                    name: 'emote_this_means_war',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'alt_art',
                    name: 'alt_1_card_unit_109th_combat_engineers',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/battle_pass_08_25/battlepass21august_shopimage_1280x720.jpg',
              offerId: 6789282,
              offerName: 'battle_pass_08/25',
              real: 11.99,
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/battle_pass_08_25/battlepass21august_shopimage_1280x720.jpg',
              title: '2025 年 8 月战场通票',
            },
          ],
          startDate: '2025-08-01T00:00:00Z',
        },
        {
          endDate: '2025-08-25T00:00:00Z',
          group: 2,
          groupId: 2280,
          offers: [
            {
              description: '',
              diamonds: 350,
              items: [
                {
                  data: {
                    itemType: 'deck',
                    name: 'deck_usa_naval_dominance',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/deck_deck_usa_naval_dominance/naval-dominance_atore.jpg',
              offerId: 6796778,
              offerName: 'deck_deck_usa_naval_dominance',
              slotType: '',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/deck_deck_usa_naval_dominance/naval-dominance_atore.jpg',
              title: '海军主宰',
            },
            {
              description:
                '这是对现有卡牌的卡图更改，并非卡牌本身。仅会改变卡牌的视觉风格，其效果保持不变。',
              diamonds: 90,
              items: [
                {
                  data: {
                    itemType: 'alt_art',
                    name: 'alt_1_card_event_combined_arms',
                  },
                  qty: 1,
                },
              ],
              offerId: 6775099,
              offerName: 'alt_art_alt_1_card_event_combined_arms',
              slotType: '',
              title: '协同作战',
            },
            {
              description:
                '使用交互式银元打火机个性化您的战场。该交互式打火机可以翻开盖子并旋转滑轮。该设备可用于美国卡组。',
              diamonds: 100,
              items: [
                {
                  data: {
                    itemType: 'prop',
                    name: 'item_Lighter_SilverDollar',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/prop_item_Lighter_SilverDollar/t_eq_us_zippo_silvercoin.png',
              offerId: 17161,
              offerName: 'prop_item_Lighter_SilverDollar',
              slotType: '',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/prop_item_Lighter_SilverDollar/t_eq_us_zippo_silvercoin.png',
              title: '打火机 - 银元',
            },
            {
              description:
                '使用此总部来个性化您的战场，该总部会更改战场桌布。踏入热带丛林的前线。该总部可用于美国卡组。',
              diamonds: 100,
              items: [
                {
                  data: {
                    itemType: 'card',
                    name: 'card_location_guadalcanal',
                  },
                  qty: 1,
                },
              ],
              offerId: 17204,
              offerName: 'hq_card_location_guadalcanal',
              slotType: '',
              title: '瓜达尔卡纳尔岛',
            },
            {
              description:
                '德国装甲师是战争初期德国闪电战行动成功的关键因素。使用德国装甲师卡背个性化你的卡组。此卡背可用于以德国为主国的卡组。',
              diamonds: 30,
              items: [
                {
                  data: {
                    itemType: 'cardback',
                    name: 'cardback_panzer',
                  },
                  qty: 1,
                },
              ],
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/cardback_cardback_panzer/cardback_panzer-division_product-image.jpg',
              offerId: 17119,
              offerName: 'cardback_cardback_panzer',
              slotType: '',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/cardback_cardback_panzer/cardback_panzer-division_thumbnail.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/cardback_cardback_panzer/cardback_panzer-division_thumbnail.jpg',
              title: '德国装甲师',
            },
            {
              description:
                '使用这款表情个性化您的战场通信。这款欢呼表情可用于美国卡组。',
              diamonds: 45,
              items: [
                {
                  data: {
                    itemType: 'emote',
                    name: 'emote_splash_one_bogey',
                  },
                  qty: 1,
                },
              ],
              offerId: 6799197,
              offerName: 'emote_emote_splash_one_bogey',
              slotType: '',
              title: '击落不明敌机！',
            },
          ],
          startDate: '2025-08-22T00:00:00Z',
        },
        {
          endDate: '2025-08-25T11:00:00Z',
          group: 1,
          groupId: 2417,
          offers: [
            {
              description: '以 30 个军官卡包的价格购买 36 个。',
              diamonds: 1200,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 30,
                },
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 6,
                },
              ],
              limit: 2,
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_buy_30_officer_packs___get_6_free/kards-basic_officer_pack_bundle-offer-30%2B6-720p.jpg',
              offerId: 6798834,
              offerName: 'offer_buy_30_officer_packs_-_get_6_free',
              priority: 4,
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_buy_30_officer_packs___get_6_free/kards-basic_officer_pack_bundle-offer-30%2B6-720p.jpg',
              timed: true,
              title: '军官卡包 - 买 30 送 6',
            },
          ],
          startDate: '2025-08-22T11:00:00Z',
        },
        {
          endDate: '2025-08-25T11:00:00Z',
          group: 1,
          groupId: 2418,
          offers: [
            {
              description: '本次限时优惠内含 7 个忠诚军官卡包。',
              diamonds: 98,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Expansion2019',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 7,
                },
              ],
              limit: 1,
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_7_soviet_packs___1_guaranteed_elite/7_national_soviet_1_elite.jpg',
              offerId: 6796873,
              offerName: 'offer_7_soviet_packs_-_1_guaranteed_elite',
              priority: 2,
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_7_soviet_packs___1_guaranteed_elite/7_national_soviet_1_elite.jpg',
              timed: true,
              title: '7 个忠诚军官卡包',
            },
          ],
          startDate: '2025-08-22T11:00:00Z',
        },
        {
          endDate: '2025-09-23T11:00:00Z',
          group: 1,
          groupId: 2428,
          offers: [
            {
              description:
                '享受 55% 超值折扣，获取全套 19 张新卡 - 优惠价只限于预购期间！本次空军主题迷你套装包含 5 张精英、10 张特殊以及 27 张限定卡牌，外加一套卡背和头像。所有内容将于 9 月 23 日发布日到账。',
              diamonds: 500,
              fulfilAfter: '2025-09-23T11:00:00Z',
              items: [
                {
                  data: {
                    itemType: 'token',
                    name: 'token_name_change',
                  },
                  qty: 1,
                },
              ],
              limit: 0,
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_air_supremacy_pre_sales/air-supremacy_keayart_shop_2.jpg',
              offerId: 6799513,
              offerName: 'offer_air_supremacy_pre-sales',
              priority: 1,
              slotType: 'discount',
              slotValue: '55',
              smallThumb:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_air_supremacy_pre_sales/air_supremacy_chinese.jpg',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_air_supremacy_pre_sales/air_supremacy_chinese.jpg',
              timed: true,
              title: '空中霸权预购',
            },
          ],
          startDate: '2025-08-22T11:00:00Z',
        },
        {
          endDate: '2025-08-25T11:00:00Z',
          group: 1,
          groupId: 2427,
          offers: [
            {
              description: '利用此限时优惠，助您冲击前线。',
              diamonds: 89,
              items: [
                {
                  data: {
                    cardCount: 7,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'Core',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
                {
                  data: {
                    cardCount: 5,
                    cardSet: 'NavalWarfare',
                    guaranteedGoldCards: 0,
                    itemType: 'pack',
                  },
                  qty: 1,
                },
                {
                  data: {
                    duration: 1,
                    itemType: 'medkit',
                  },
                  qty: 1,
                },
                {
                  data: {
                    itemType: 'draft',
                  },
                  qty: 1,
                },
              ],
              limit: 2,
              mainImage:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_weekend_special___1_officer_pack_2_packs_draft_ticket_1day_medkit/kards-bundle_offer-medkit_bundle-720p.jpg',
              offerId: 6799572,
              offerName:
                'offer_weekend_special_-_1_officer_pack+2_packs+draft_ticket+1day_medkit',
              priority: 3,
              slotType: 'most_popular',
              thumbnail:
                'https://d3t4xohaeg8xj9.cloudfront.net/kards/store/offer/offer_weekend_special___1_officer_pack_2_packs_draft_ticket_1day_medkit/kards-bundle_offer-medkit_bundle-720p.jpg',
              title: '周末特惠',
            },
          ],
          startDate: '2025-08-22T11:00:00Z',
        },
        {
          endDate: '2025-08-24T00:00:00Z',
          group: 3,
          groupId: 2175,
          offers: [
            {
              items: [
                {
                  data: {
                    itemType: 'card',
                    name: 'card_unit_6_pounder',
                  },
                  qty: 1,
                },
              ],
              offerId: 6715394,
              offerName: 'card_unit_6_pounder',
            },
            {
              bonus: true,
              diamonds: 8,
              items: [
                {
                  data: {
                    itemType: 'card',
                    name: 'card_unit_sturmovik_pol',
                  },
                  qty: 1,
                },
              ],
              offerId: 6754571,
              offerName: 'card_unit_sturmovik_pol',
            },
            {
              diamonds: 8,
              items: [
                {
                  data: {
                    itemType: 'card',
                    name: 'card_event_sisu',
                  },
                  qty: 1,
                },
              ],
              offerId: 6762899,
              offerName: 'card_event_sisu',
            },
          ],
          startDate: '2025-08-23T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 12,
          groupId: -1,
          hidden: true,
          offers: [
            {
              diamonds: 20,
              gold: 150,
              items: [
                {
                  data: {
                    itemType: 'draft',
                  },
                  qty: 1,
                },
              ],
              offerId: 6740392,
              offerName: 'draft_ticket',
            },
            {
              diamonds: 80,
              items: [
                {
                  data: {
                    duration: 7,
                    itemType: 'medkit',
                  },
                  qty: 1,
                },
              ],
              offerId: 6757794,
              offerName: 'medkit_7d',
            },
            {
              diamonds: 40,
              items: [
                {
                  data: {
                    duration: 3,
                    itemType: 'medkit',
                  },
                  qty: 1,
                },
              ],
              offerId: 6757793,
              offerName: 'medkit_3d',
            },
            {
              diamonds: 20,
              items: [
                {
                  data: {
                    duration: 1,
                    itemType: 'medkit',
                  },
                  qty: 1,
                },
              ],
              offerId: 6757792,
              offerName: 'medkit_1d',
            },
            {
              diamonds: 20,
              items: [
                {
                  data: {
                    duration: 1,
                    itemType: 'medkit',
                  },
                  qty: 1,
                },
              ],
              offerId: 6744365,
              offerName: 'medkit',
            },
          ],
          startDate: '2018-01-01T00:00:00Z',
        },
        {
          endDate: '2099-01-01T00:00:00Z',
          group: 1,
          groupId: -1,
          offers: [],
          startDate: '2018-01-01T00:00:00Z',
        },
      ],
      message: 'Offers for 2025-08-23T04:20:09.024285',
      status: 200,
      ts: 1755922809.024285,
    };
  }

  @Get('fp')
  getFp() {
    return {
      changed: true,
      elements: [
        {
          content: {
            banner_text: {
              font_size: 56,
              text: '',
            },
            heading: {
              font_size: 80,
              text: '打开',
            },
            icon: {
              icon_url:
                'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-3/box_packs_icon.png',
            },
            image_url:
              'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-3/box_packs_edge.jpg',
            link: 'kards:openpacks',
            priority: 1,
            slot: 2,
            sub_heading: {
              font_size: 80,
              text: '卡包',
            },
            type: 1,
          },
          elementId: 27,
          endDate: '9999-12-31T23:59:00Z',
          isPublished: true,
          isTargeted: false,
          startDate: '0001-01-01T00:00:00Z',
        },
        {
          content: {
            banner_text: {
              font_size: 56,
              text: '',
            },
            heading: {
              font_size: 80,
              text: '竞技场',
            },
            icon: {
              icon_url:
                'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-2/box_draft_icon.png',
            },
            image_url:
              'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-2/box_draft_edge_unclesam.jpg',
            link: 'kards:draft',
            priority: 3,
            slot: 1,
            sub_heading: {
              font_size: 80,
            },
            type: 1,
          },
          elementId: 31,
          endDate: '2026-12-31T10:59:00Z',
          isPublished: true,
          isTargeted: false,
          startDate: '2024-06-24T08:00:00Z',
        },
        {
          content: {
            banner_text: {
              font_size: 56,
              text: '',
            },
            heading: {
              font_size: 80,
              text: 'Bilibili',
            },
            icon: {
              icon_url:
                'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-1/BiliBili.png',
            },
            image_url:
              'https://helsinki-test.s3.eu-west-1.amazonaws.com/box-1/box_discord_edge.jpg',
            link: 'https://space.bilibili.com/527435380/',
            priority: 2,
            slot: 0,
            sub_heading: {
              font_size: 56,
            },
            type: 1,
          },
          elementId: 35,
          endDate: '2025-12-31T15:00:00Z',
          isPublished: true,
          isTargeted: false,
          startDate: '2023-12-11T12:00:00Z',
        },
        {
          content: {
            banner_text: {
              font_size: 56,
              text: '',
            },
            heading: {
              font_size: 64,
              text: 'GMC CCKW',
            },
            icon: {
              icon_url: '',
            },
            image_url:
              'https://cdn3.easylink.cc/a80c5f01-bba2-404c-957e-ddcf65e1ffdd_Kards_Academy_B_3d_comp.png?e=1754655492&token=J_WyMIdhZtwb0E0QHWRqEfQrd5lVSWLffl9QxaxP:EEfJDXNk8-LowIHEBColgo4Rg44=',
            link: 'https://qm.qq.com/q/QGQaJVto8E',
            priority: 4,
            sub_heading: {
              font_size: 40,
              text: 'QQ群：884762581',
            },
            type: 0,
          },
          elementId: 28,
          endDate: '2020-01-31T15:00:00Z',
          isPublished: true,
          isTargeted: false,
          startDate: '2019-11-06T11:00:00Z',
        },
        {
          content: {
            banner_text: {
              font_size: 56,
              text: '',
            },
            heading: {
              font_size: 56,
              text: '赞助我们',
            },
            icon: {
              icon_url: '',
            },
            image_url:
              'https://cdn3.easylink.cc/a6dee458-4103-40d1-ad86-8442c9889ea9_Kards_Academy_B_3d_comp.png?e=1754673731&token=J_WyMIdhZtwb0E0QHWRqEfQrd5lVSWLffl9QxaxP:ZjUCVD-AhWKwPPYkqAhzqrTrrR8=',
            link: 'https://afdian.com/a/karsmod',
            priority: 4,
            sub_heading: {
              font_size: 56,
              text: '您的支持是我们最大的动力',
            },
            type: 0,
          },
          elementId: 29,
          endDate: '2026-01-31T15:00:00Z',
          isPublished: true,
          isTargeted: false,
          startDate: '2023-11-06T11:00:00Z',
        },
      ],
    };
  }
}
